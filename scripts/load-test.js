import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * API Baseline Load Test against JSONPlaceholder.
 * Goal: Ensure P95 response time is under 500ms under load.
 */
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users
    { duration: '30s', target: 0 },  // Ramp-down
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // Fail if errors > 1%
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has body': (r) => r.body.length > 0,
  });

  sleep(1);
}
