# Playwright Hybrid Automation Framework

## Overview
A scalable Playwright-based automation framework combining UI and API testing.  
Designed to improve execution speed, maintainability, and test reliability using modern SDET practices.

---

## Tech Stack
- Playwright (JavaScript)
- Node.js
- Page Object Model (POM)
- Playwright Fixtures
- API Testing (Playwright request)

---

## Key Highlights
- Hybrid UI + API automation framework
- API-based authentication using token injection (bypasses UI login)
- Parallel test execution using Playwright workers
- Test tagging for selective execution (smoke/regression)
- Environment-based configuration using `.env`
- Clean architecture with separation of Pages, API, and Fixtures

---

## Features
- UI automation (Login, Register, End-to-End flows)
- API automation (Authentication & user APIs)
- UI + API integration testing
- Reusable fixtures for setup and authentication
- Data-driven testing using JSON

---


---

## Setup Instructions

1. Install dependencies
```bash
npm install
```
2. Install Playwright browsers
```bash
npx playwright install
```
3. Add environment variables
Create .env file
EMAIL=your_email
PASSWORD=your_password

4. Run all tests
```bash
npm test
```
5. Run smoke/regression tests
```bash
npm run smoke
npm run regression
```
6. Run in headed mode
```bash
npm run headed
```
7. Reports
```bash
npm run report
```

## Reports / Execution

![Execution Screenshot](./screenshots/dashboard.png)
![Execution Screenshot](./screenshots/registrationsuccess.png)
