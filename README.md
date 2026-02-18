# Automation Recruitment Task

[![Tests](https://github.com/kkkrzychu/Recruitment_Task/actions/workflows/run-tests-and-allure.yml/badge.svg)](https://github.com/kkkrzychu/Recruitment_Task/actions/workflows/run-tests-and-allure.yml)

This repository contains automated tests for:

- **APITest.DummyJSON** - implemented with CodeceptJS (REST helper)
- **UITest.SauceDemo** - umplemented with CodeceptJS + Playwright
- Gherkin (BDD) syntax is used for test scenarios
- Allure reporting is supported
- Tests are running on workflow
  - on push to main
  - every 12 hours
  - manually triggered by user

### GitHub Pages (allure-report branch)
The latest generated Allure report is published via GitHub Pages and cen be accesed here:

[![Latest Allure Report](https://img.shields.io/badge/Latest%20Allure-Report-purple?logo=allure)](https://kkkrzychu.github.io/Recruitment_Task/)

The report is automatically generated after each successful CI run.

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

## Future Improvements

Below are areas i would like to improve and refactor in the future

### 1. Stabilize Playwright Installation in GitHub Actions

Currently, the `playwright install` step in GitHub Actions sometimes takes up to 30 minutes, which makes the CI pipeline unstable and slow. 

### 2. Replace Hardcoded Test Data with Data Tables

At the moment, product test data is hardcoded directly in the code.
Plan is to refactor test data to use data tables and make scenarios more flexible and reusable.

### 3. Remove Hardcoded Base URL from API Requests

Currently, the base API URL is hardcoded directly inside the request method.
Planned improve is to move the base URL to an environment configuration file.

### 4. Improve Allure Report Histori in GitHub Actions

Currently the Allure report generated in GitHub Actions
- Contains only the current pipeline run
- Does not preserve historical execution data, except leftover results from local runs

As the result, trend analysis and historical insights are not available in CI

The goal is to make Allure reporting more reliable, clean, and suitable for long-term quality monitoring
