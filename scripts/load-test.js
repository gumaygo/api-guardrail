import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * API Baseline Load Test
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
  const payload = JSON.stringify({
    userId: 'load_tester_001',
    items: [{ productId: 'p_001', quantity: 1, price: 10.5 }]
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post('https://api.example.com/v1/orders', payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1);
}
