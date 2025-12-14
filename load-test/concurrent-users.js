import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    scenarios: {
        concurrent_users: {
            executor: 'constant-vus',
            vus: 100,
            duration: '2m',
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<300'],
        errors: ['rate<0.1'],
    },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export function setup() {
    const registerRes = http.post(`${BASE_URL}/api/auth/register`, JSON.stringify({
        email: `concurrent${Date.now()}@example.com`,
        password: 'Concurrent123!',
    }), {
        headers: { 'Content-Type': 'application/json' },
    });

    return { token: registerRes.json('token') };
}

export default function (data) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
        },
    };

    // Mix of operations
    const operations = [
        () => {
            // Create URL
            const res = http.post(`${BASE_URL}/api/shorten`, JSON.stringify({
                originalUrl: `https://example.com/concurrent/${Math.random()}`,
            }), params);
            return check(res, { 'create status 201': (r) => r.status === 201 });
        },
        () => {
            // Get URLs
            const res = http.get(`${BASE_URL}/api/urls`, params);
            return check(res, { 'get status 200': (r) => r.status === 200 });
        },
    ];

    const operation = operations[Math.floor(Math.random() * operations.length)];
    operation() || errorRate.add(1);

    sleep(1);
}
