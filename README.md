# Automation Recruitment Task

This repository contains automated tests for:

- **APITest.DummyJSON** - implemented with CodeceptJS (REST helper)
- **UITest.SauceDemo** - umplemented with CodeceptJS + Playwright
- Gherkin (BDD) syntax is used for test scenarios
- Allure reporting is supported

---
# Prerequisites

Make sure the following are installed:
- **[Node.js](https://nodejs.org/en/download)** (v18 or higher recommended)
- **npm**
- **Allure Comandline**
---

# Installation

To install Allure globally:
```bash
npm install -g allure-commandline --save-dev
```

## Install API dependencies

```bash
cd APITest.DummyJSON

npm install
```

## Install UI dependencies
```bash
cd UITest.SauceDemo

npm install

npx playwright install
```


>Note: 'npx playwright install' is required to download browser binaries

---
# Running Tests with Allure Reporting
## Run API Tests
```bash
cd APITest.DummyJSON

npx codeceptjs run

allure serve
```


## Run UI tests
```bash
cd UITest.SauceDemo

npx codeceptjs run

allure serve
```

---
## Design Decisions & Notes

This project contains automated tests for both the Products API (REST) and UI (Playwright) scenarios.
Some design choices were made intentionally to balance clarity, simplicity, and maintainability, given the limited time available to implement the tests.

### API Layer
- All HTTP requests are implemented using native `fetch` for explicit control over request payloads and responses.
- Responses are stored in shared variables (`lastResponse`, `fetchedData`, `updatedData`) for step-to-step assertions.
- Base URL is hardcoded in API methods for simplicity, although in production it should be centralized in a configurable client.
- Test data (e.g., `newProduct`) is stored in separate modules to avoid duplication and improve readability.

### Test Structure
- Scenarios are written in Gherkin for clarity and maintainability.
- Each step focuses on a single action or assertion, keeping the test logic readable.
- Parameterized tests (Scenario Outline) are used for testing response time with multiple delay values.

> These decisions were made to demonstrate understanding of clean test design, DRY principles, and maintainable test automation,
> while keeping the project focused and easy to understand for a recruitment review.
