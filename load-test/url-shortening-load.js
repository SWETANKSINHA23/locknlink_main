import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '30s', target: 20 },  // Ramp up to 20 users
        { duration: '1m', target: 50 },   // Ramp up to 50 users
        { duration: '30s', target: 0 },   // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'], // 95% of requests under 200ms
        errors: ['rate<0.1'],              // Error rate under 10%
    },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

export function setup() {
    // Register and login to get auth token
    const registerRes = http.post(`${BASE_URL}/api/auth/register`, JSON.stringify({
        email: `loadtest${Date.now()}@example.com`,
        password: 'LoadTest123!',
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

    // Test URL shortening
    const payload = JSON.stringify({
        originalUrl: `https://example.com/test/${Math.random()}`,
    });

    const res = http.post(`${BASE_URL}/api/shorten`, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'has shortUrl': (r) => r.json('shortUrl') !== undefined,
    }) || errorRate.add(1);

    sleep(1);
}
