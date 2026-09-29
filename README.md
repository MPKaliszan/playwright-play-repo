# Playwright QA Automation Practice

A hands-on QA automation project built to develop and demonstrate practical experience with **Playwright**, UI testing, API testing, Page Object Model, fixtures, assertions, and test organization.

The project uses the [TodoMVC](https://demo.playwright.dev/todomvc/) application as a small, predictable test target while focusing on writing maintainable and meaningful test cases.

## Current Focus

* UI functional testing
* Page Object Model (POM)
* Playwright locators and locator chaining
* Assertions and negative assertions
* Custom Playwright fixtures
* Test organization and separation of concerns
* DOM/accessibility roles
* Allure screenshots and reporting
* API / endpoint testing *(in progress)*
* CI/CD integration *(planned)*

## Project Structure

```text
.
├── pages/
│   └── todoPages.js
│
├── tests/
│   ├── functionality.spec.js
│   ├── layout.spec.js
│   └── fixtures.js
│
├── playwright.config.js
├── package.json
└── .gitignore
```

## Page Object Model

The TodoMVC interface is represented by a `todoPages` Page Object.

The Page Object contains:

* Locators
* Page interaction methods
* Reusable element targeting logic

For example:

```js
await todoPage.addTodo('Buy milk');
await todoPage.markComplete('Buy milk');
await todoPage.deleteTodo('Buy milk');
```

Assertions remain primarily in the test specifications so that the Page Object describes **how to interact with the application**, while the tests describe **what behavior is expected**.

## Fixtures

A custom Playwright fixture provides an initialized `todoPage` object to tests.

```js
test('Add a todo', async ({ todoPage }) => {
    await todoPage.addTodo('Buy milk');

    await expect(
        todoPage.todoItem('Buy milk')
    ).toBeVisible();
});
```

The fixture handles creating the Page Object and navigating to the application, avoiding duplicated setup across specification files.

## Tests

Current UI coverage includes:

* Creating todo items
* Completing todo items
* Deleting todo items
* Verifying multiple items
* Filtering active/completed/all items
* Verifying page header content
* Verifying footer content
* Verifying links and their target URLs
* Basic visibility and DOM assertions

## Running the Tests

Install dependencies:

```bash
npm install
```

Run the complete test suite:

```bash
npx playwright test
```

Run a specific specification:

```bash
npx playwright test tests/functionality.spec.js
```

Run a test by name:

```bash
npx playwright test -g "Add milk"
```

## Reporting

The project also uses **Allure** for test reporting and captures screenshots at selected points during test execution.

## Purpose

This repository is primarily a **hands-on QA automation learning and portfolio project**.

The goal is to build practical familiarity with Playwright and modern automated testing techniques while applying QA principles such as meaningful coverage, maintainability, clear assertions, and separation of responsibilities.

Further work will expand the project into API testing and CI/CD.
