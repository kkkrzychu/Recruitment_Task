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

