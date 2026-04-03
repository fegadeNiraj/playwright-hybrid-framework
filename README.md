# Playwright Hybrid Automation Framework

## Overview
This project demonstrates a scalable Playwright automation framework combining UI and API testing.

## Tech Stack
- Playwright (JavaScript)
- Node.js
- Page Object Model (POM)
- Fixtures
- API Testing (built-in request)

## Features
- UI automation (Login, Register, E2E flows)
- API automation (Auth, User APIs)
- UI + API integration testing
- Token-based authentication (skip UI login)
- Data-driven testing using JSON
- Reusable fixtures for clean test setup

## Key Highlight
Implemented API-based authentication and injected the token into localStorage to bypass UI login, improving test stability and execution speed.

## How to Run
```bash
npm install
npx playwright test
