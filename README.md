# api-guardrail

Automated contract and reliability testing suite for backend services. This project focuses on enforcing data integrity between microservices using schema validation and performance thresholds.

## Overview
In distributed systems, undocumented API changes can break downstream consumers. This suite ensures that every response matches a strictly defined contract (Zod schemas) and meets performance requirements (k6) before being deployed.

## Core Features
- **Contract Enforcement**: Uses Zod to validate types, formats (UUID, DateTime), and mandatory fields in API responses.
- **Negative Testing**: Automated suites for validating 4xx error handling (Unauthorized, Bad Request).
- **Performance Baselines**: Load testing scripts to verify P95 latency thresholds (< 500ms).
- **CI/CD Ready**: Designed to be integrated into any pipeline as a quality gate.

## Tech Stack
- **Framework**: Jest
- **Client**: Supertest
- **Validation**: Zod
- **Load Testing**: k6
- **Language**: Node.js (CommonJS)

## Setup
```bash
git clone https://github.com/gumaygo/api-guardrail.git
cd api-guardrail
npm install
```

## Usage

### Functional & Contract Tests
Run Jest to validate API logic and data structures:
```bash
npm test
```

### Performance Testing
Execute load tests (requires k6 installed):
```bash
k6 run scripts/load-test.js
```

## Project Structure
- `src/schemas/`: Centralized Zod contracts (Source of Truth).
- `tests/`: Integration and regression test suites.
- `scripts/`: k6 load testing configurations.
- `docs/`: Technical documentation and benchmarks.

## Example Contract
```javascript
const OrderSchema = z.object({
  id: z.string().uuid(),
  totalPrice: z.number().positive(),
  status: z.enum(['pending', 'paid', 'cancelled']),
  createdAt: z.string().datetime()
});
```

## License
MIT
