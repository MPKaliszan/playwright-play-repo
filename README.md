# Playwright QA Automation Practice

A personal QA automation practice project built to develop practical Playwright skills across UI and API testing.

The project focuses on writing maintainable, readable tests while exploring Playwright's core features rather than building an overly complex automation framework.

## Current Coverage

### UI Testing

The UI suite uses the [TodoMVC](https://demo.playwright.dev/todomvc/) application and currently covers:

* Adding todo items
* Completing todo items
* Deleting todo items
* Multiple todo items
* Active / Completed / All filtering
* Header validation
* Footer validation
* Link and attribute validation
* Element visibility and state
* Accessibility-based locators

### API Testing

API tests use ReqRes and currently cover:

* GET endpoint health checks
* API authentication
* Missing API-key handling
* Read-only vs administrative API access
* Creating records with POST
* Extracting IDs from JSON responses
* Fetching newly created records
* Deleting records
* Verifying deleted records return `404`
* Chaining dependent API requests

The current API lifecycle test follows:

```text
POST → extract ID → GET → DELETE → GET
```

## Playwright Features Practiced

* Locators
* Accessibility roles
* Locator chaining and filtering
* Assertions
* Page Object Model
* Custom fixtures
* API request testing
* Request headers and authentication
* JSON request / response handling
* Test tags
* Multiple browser projects
* Allure reporting
* Screenshots
* Environment variables
* Git / GitHub workflow

## Project Structure

```text
Playwright/
├── playwright.config.js
├── package.json
├── .env
├── tests/
│   ├── Api/
│   │   └── api.spec.js
│   ├── TodoMVC/
│   │   ├── todo.Functionality.spec.js
│   │   └── todoPage.Layout.spec.js
│   ├── utils/
│   │   ├── genericUtils.ts
│   │   └── MockBuilder.js
│   └── example.spec.js
└── ...
```

The API client abstraction is the next planned step for reducing repeated API request logic.

## Page Object Model

UI interaction logic is separated from test scenarios using Page Objects.

For example:

```text
Test
 ↓
Todo Page Object
 ↓
Playwright Locator
 ↓
Browser
```

The Page Object handles interactions such as:

```js
addTodo()
markComplete()
deleteTodo()
clickButton()
todoItem()
```

Tests remain responsible for defining the scenario and asserting the expected result.

## API Client

API testing follows a similar separation of responsibilities.

The planned structure is:

```text
Test
 ↓
API Client
 ↓
Playwright request
 ↓
HTTP API
```

The API Client will encapsulate reusable operations such as:

```js
createRecord()
getRecord()
deleteRecord()
```

while keeping assertions in the test cases.

## Fixtures

A custom Playwright fixture is used to initialize the TodoMVC Page Object:

```js
test('example', async ({ todoPage }) => {
    await todoPage.addTodo('milk');
});
```

This keeps setup consistent across tests and avoids duplicating Page Object initialization.

## API Authentication

API credentials are stored in environment variables rather than committed to the repository.

Example:

```env
REQRES_API_KEY=...
REQRES_API_KEY_ADMIN=...
```

`.env` is excluded through `.gitignore`.

## Running Tests

Run the complete suite:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test -g "test name"
```

Run API tests by tag:

```bash
npx playwright test --grep "@api"
```

List discovered tests:

```bash
npx playwright test --list
```

## Reporting

Allure reporting is configured for the project.

Test screenshots can also be attached to Allure reports during test execution.

## Goals

This project is primarily a practical learning and portfolio project focused on QA engineering skills:

* Playwright
* UI automation
* API testing
* JavaScript / TypeScript
* Test design
* Maintainable test structure
* CI/CD
* Git / GitHub

Future work includes expanding API coverage, introducing the API Client abstraction, and integrating the project into CI/CD.

## Why This Project?

The goal is not to create the most elaborate automation framework possible.

Instead, the project is intended to demonstrate the ability to:

1. Understand an application's behavior.
2. Design meaningful test scenarios.
3. Select appropriate locators and assertions.
4. Automate UI and API workflows.
5. Reuse common test interactions without hiding the test logic.
6. Diagnose failures and understand what the underlying tools are doing.
7. Maintain a practical, readable automation suite.
