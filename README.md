
[![Tests](https://github.com/kkkrzychu/Recruitment_Task/actions/workflows/run-tests-and-allure.yml/badge.svg)](https://github.com/kkkrzychu/Recruitment_Task/actions/workflows/run-tests-and-allure.yml)

This repository contains automated tests for:

- **APITest.DummyJSON** - implemented with CodeceptJS (REST helper)
- **UITest.SauceDemo** - umplemented with CodeceptJS + Playwright
- Gherkin (BDD) syntax is used for test scenarios
- Allure reporting is supported
- Tests are running on workflow
  - every morning
  - manually triggered by user

### GitHub Pages (allure-report branch)
The latest generated Allure report is published via GitHub Pages and can be accesed here:

[![Latest Allure Report](https://img.shields.io/badge/Latest%20Allure-Report-purple?logo=allure)](https://kkkrzychu.github.io/Recruitment_Task/)

The report is automatically generated after each successful CI run.

## Project Structure

```
Recruitment_Task
│
├── APITest.DummyJSON
│   ├── features            # Gherkin API test scenarios
│   ├── step_definitions    # Step definitions for API tests
│   └── codecept.conf.js    # CodeceptJS configuration
│
├── UITest.SauceDemo
│   ├── features            # Gherkin UI test scenarios
│   ├── step_definitions    # Step definitions for UI tests
│   └── codecept.conf.js    # CodeceptJS configuration
│
├── .github/workflows       # CI pipelines
│
└── README.md
```

## Test Strategy

The goal of this project was to demonstrate automated testing of both API and UI layers using BDD practices.

### API Tests

API tests focus on validating the Products endpoints from DummyJSON.

Key aspects covered:

* response status validation
* response structure validation
* product data verification
* filtering and search scenarios

API tests are implemented using:

* CodeceptJS REST helper
* Gherkin scenarios
* reusable step definitions

### UI Tests

UI tests cover the login and product purchase flow on SauceDemo.

Main scenarios include:

* successful login
* invalid login validation
* adding products to the cart
* completing checkout

UI automation uses:

* Playwright
* CodeceptJS

### BDD Approach

Both API and UI tests use Gherkin syntax to improve readability and collaboration between technical and non-technical stakeholders.

### Reporting

All test runs generate Allure reports which include:

* test execution results
* step details
* historical trends in CI

---
### Github Actions Artifacts
>Note: Allure Comandline requred

You can also download the Allure report directly from a specific workflow run:
1. Go to the **Actions** tab in the repository
2. Open the selected workflow run
3. Scroll down to the **Artivacts** section
4. Download the file
```bash
allure-results.zip
```
5. Extract the ZIP file
6. Open Command Prompt (CMD) in the extracted folder (the folder containing allure-results)
7. run
```bash
allure generate
```
This will create a new folder
```bash
allure-report
```
8. Then run
```bash
allure open
```
This will start a local server and open the report in your default browser.

This allows you to inspect reports from specific historical runs, even if they are no longer available on GitHub Pages




---
## Prerequisites for local

Make sure the following are installed:
- **[Node.js](https://nodejs.org/en/download)** (v18 or higher recommended)
- **npm**
- **Allure Comandline**
---

## Installation

To install Allure globally:
```bash
npm install -g allure-commandline --save-dev
```

### Install API dependencies

```bash
cd APITest.DummyJSON

npm install
```

### Install UI dependencies
```bash
cd UITest.SauceDemo

npm install

npx playwright install
```


>Note: 'npx playwright install' is required to download browser binaries

---
## Running Tests with Allure Reporting
### Run API Tests
```bash
cd APITest.DummyJSON

npx codeceptjs run

allure serve
```


### Run UI tests
```bash
cd UITest.SauceDemo

npx codeceptjs run

allure serve
```

---
## Design Decisions & Notes

This project contains automated tests for both the Products API (REST) and UI (Playwright) scenarios.
Some design choices were made intentionally to balance clarity, simplicity, and maintainability, given the limited time available to implement the tests.


---

## Improvements & Future Work

Below are areas that were initially identified for improvement during the implementation.

### 1. ⚠️ Stabilize Playwright Installation in GitHub Actions

Update: During testing Playwright installation time did not significantly impact the CI pipeline, so this optimization was deprioritized.

Currently, the `playwright install` step in GitHub Actions sometimes takes up to 30 minutes, which makes the CI pipeline unstable and slow. 

### 2. ✅ Replace Hardcoded Test Data with Data Tables

Update: Product test data was refactored to use Gherkin data tables, making scenarios more flexible and reusable

At the moment, product test data is hardcoded directly in the code.
Plan is to refactor test data to use data tables and make scenarios more flexible and reusable.

### 3. ✅ Remove Hardcoded Base URL from API Requests

Update: The base API URL was moved to the configuration file to make the tests easier to maintain and reuse across environments.

Currently, the base API URL is hardcoded directly inside the request method.
Planned improvement is to move the base URL to an environment configuration file.

### 4. ✅ Improve Allure Report History in GitHub Actions

Update: Allure report history is now preserved in CI, enabling trend analysis and historical insights in the published reports.

Currently the Allure report generated in GitHub Actions
- Contains only the current pipeline run
- Does not preserve historical execution data, except leftover results from local runs

As the result, trend analysis and historical insights are not available in CI

The goal is to make Allure reporting more reliable, clean, and suitable for long-term quality monitoring
