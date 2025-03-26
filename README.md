# 🧪 Qantas Hotel UI coding test with Playwright

This project automates UI tests for the Sauce Demo store using **Playwright** with **TypeScript**.

---

## 🚀 **Setup**

1. **Clone the repo:**

   ```bash
   git clone <https://github.com/sominwani/q-loyal-code-test-ui.git>
   cd <your-project-folder>
   ```

2. **Install dependencies**

    ``` bash
    npm install
    ```

## 📁 Project Directory Structure

```
q-loyal-code-test-ui/
│
├── .github/                 # CI/CD workflows for GitHub Actions
│   └── workflows/
│       └── playwright-tests.yml
│
├── src/                     # Source code for test files
│   ├── pages/               # Page Object Models
│   │   ├── loginPage.ts
│   │   └── cartPage.ts
│   └── tests/               # Test files
│       ├── cart.test.ts
│       └── checkout.test.ts
│
├── playwright.config.ts     # Playwright configuration file
│
├── package.json             # Project dependencies and scripts
│
└── README.md                # Project documentation
```


## 🛠️  **Run Tests**

1. Navigate to the project directory: Execute test on individual browser

    ``` bash
   npm run test:chrome
   ```
   ``` bash
   npm run test:firefox
   ```
   ``` bash
   npm run test:safari
   ```

2. Navigate to the project directory: Execute test all browsers

    ``` bash
   npm run test
   ```

## HTML reporter

HTML reporter produces a self-contained folder './playwright-report' that contains report for the test run that can be served as a web page.

By default, HTML report is opened automatically if some of the tests failed. You can control this behavior via the open property in the Playwright config or the `PW_TEST_HTML_REPORT_OPEN` environmental variable. The possible values for that property are `always`, `never` and `on-failure` (default).


## Playwright Configuration

The `playwright.config.js` file configures the Playwright test environment. It specifies settings such as browsers to use, context options, and additional configurations needed for test execution.

## 🎯 Key Features

•	✅ Product Add-to-Cart Validation

•	✅ Cart & Checkout Overview Assertions

•	✅ Dynamic Locator Handling

•	✅ Parallel Testing Support


## 📌 Author


Created by: **Somin Wani**

### 📌 ROLE Applying For

**Senior Quality Engineer – Qantas Hotels**