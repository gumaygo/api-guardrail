# API Guardrail

[![CI](https://github.com/gumaygo/api-guardrail/actions/workflows/ci.yml/badge.svg)](https://github.com/gumaygo/api-guardrail/actions/workflows/ci.yml)

API Guardrail is a QA automation portfolio project focused on API quality gates. It combines contract validation, real API integration tests, custom assertions, HTML reporting, and lightweight load testing in a single Node.js framework.

## Problem

Backend teams often catch API issues too late because response payloads, auth flows, and schema changes are validated manually or only after deployment. That creates regressions, unstable integrations, and longer debugging cycles.

## Solution

This project provides a reusable API automation framework built around:

- contract testing with Zod schemas
- real API integration tests against JSONPlaceholder
- semantic Jest assertions for readable failures
- resilient Axios client configuration with retry support
- JWT auth utility with token generation and verification tests
- generated HTML reports for every test run
- optional load testing through k6
- Postman collection support for quick manual verification

## Tech Stack

- Node.js (18, 20)
- Jest
- Axios
- Zod
- Faker
- Winston
- JSON Web Token
- k6
- GitHub Actions

## Key Features

- Schema-based contract validation using `Zod`
- Custom matcher `toMatchSchema` for cleaner test intent
- Real API integration tests (GET, POST, query params, error handling, response time)
- Factory-driven payload generation for repeatable test data
- Retry-enabled API client with request and response logging
- JWT auth utility with generation, verification, and tamper detection tests
- HTML test report generation through `jest-html-reporters`
- Postman collection for manual debugging and collaboration

## Project Structure

```text
api-guardrail/
|-- collection.json
|-- scripts/load-test.js
|-- src/
|   |-- clients/ApiClient.js
|   |-- factories/OrderFactory.js
|   |-- schemas/
|   |   |-- OrderSchema.js
|   |   |-- UserSchema.js
|   |   `-- PostSchema.js
|   `-- utils/auth.js
`-- tests/
    |-- OrderIntegrity.test.js
    |-- UserApi.integration.test.js
    |-- PostApi.integration.test.js
    `-- Auth.test.js
```

## How To Run

1. Install dependencies.

```bash
npm install
```

2. Create your local environment file.

```bash
cp .env.example .env
```

3. Run the automated checks.

```bash
npm test
```

4. Generate the HTML report explicitly when needed.

```bash
npm run test:report
```

5. Run the load-test scenario.

```bash
npm run load-test
```

## Sample Output

```text
PASS tests/OrderIntegrity.test.js
  OrderService.Contract.Tests
    √ should validate order schema on success response
    √ should fail validation on invalid payload structure
    √ should catch price type mismatch error

PASS tests/UserApi.integration.test.js
  UserApi.Integration.Tests
    √ GET /users should return array matching UserSchema
    √ GET /users/1 should return single user matching UserSchema
    √ GET /users/9999 should return 404
    √ GET /users should have correct content-type header
    √ GET /users response time should be under 2000ms

PASS tests/PostApi.integration.test.js
  PostApi.Integration.Tests
    √ GET /posts should return array matching PostSchema
    √ GET /posts/1 should return single post matching PostSchema
    √ GET /posts?userId=1 should filter posts by user
    √ POST /posts should create a new post
    √ POST /posts with empty body should still return 201

PASS tests/Auth.test.js
  Auth.Utility.Tests
    √ should generate a valid JWT token
    √ should verify a valid token and return payload
    √ should reject an invalid token
    √ should reject a tampered token
    √ should include expiration in generated token
```

## Report And CI

- Every `npm test` run generates an HTML report in `docs/reports/`
- GitHub Actions runs the test suite on Node 18 and 20 on every push and pull request to `main`
- The workflow uploads the generated HTML report as a build artifact so reviewers can inspect results without running the project locally

## Impact

- Reduces the chance of silent contract regressions before deployment
- Makes API failures easier to debug with structured logs and readable assertions
- Demonstrates QA automation skills across validation, integration testing, reporting, and CI

## Postman Collection

Import `collection.json` into Postman for quick manual checks or exploratory testing.
