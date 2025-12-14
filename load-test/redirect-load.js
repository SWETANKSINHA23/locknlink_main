import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
    stages: [
        { duration: '1m', target: 100 },  // Ramp up to 100 users
        { duration: '2m', target: 100 },  // Stay at 100 users
        { duration: '30s', target: 0 },   // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<100'], // 95% under 100ms for redirects
        errors: ['rate<0.05'],
    },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';

// Pre-created short URLs for testing
const shortUrls = ['test1', 'test2', 'test3', 'test4', 'test5'];

export default function () {
    const shortUrl = shortUrls[Math.floor(Math.random() * shortUrls.length)];

    const res = http.get(`${BASE_URL}/${shortUrl}`, {
        redirects: 0, // Don't follow redirects
    });

    check(res, {
        'status is 302 or 404': (r) => r.status === 302 || r.status === 404,
    }) || errorRate.add(1);

    sleep(0.5);
}
