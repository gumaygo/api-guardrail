# API Guardrail Framework

A professional API testing framework built with **Jest**, **Axios**, and **Zod** for high-integrity contract validation.

## 🚀 Features
- **Strict Contract Testing**: Powered by Zod for schema-level validation.
- **Factory Pattern**: Centralized data generation with Faker.js.
- **Resilient Client**: Axios-based client with auto-retry and interceptors.
- **Semantic Assertions**: Custom Jest matchers (`toMatchSchema`).
- **Visual Reporting**: Automatic HTML report generation.
- **Security Testing**: Integrated JWT utility for auth simulations.

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   # Update variables in .env as needed
   ```

3. **Run Tests**:
   - Standard: `npm test`
   - With HTML Report: `npm run test:report`
   - Load Test: `npm run load-test`

## 📂 Project Structure
- `src/clients/`: Core API client configuration.
- `src/factories/`: Dynamic test data generation.
- `src/schemas/`: Zod schemas for API contracts.
- `src/utils/`: Helper utilities (Auth, etc.).
- `tests/`: End-to-end and integration test suites.
- `docs/reports/`: Generated test results (Auto-ignored by git).
- `logs/`: Runtime logs for debugging.

## 📜 Collection
Import `collection.json` to **Postman** for manual debugging.

---
*Built for Scalability and Integrity.*
