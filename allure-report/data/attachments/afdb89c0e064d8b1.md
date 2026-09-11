# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todos.spec.js >> Add milk
- Location: tests\todos.spec.js:4:5

# Error details

```
TypeError: _todoPages.TodoPage is not a constructor
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import {TodoPage } from './pages/todoPages';
  3  | 
  4  | test('Add milk', async ({ page }) => {
> 5  |     const todoPage = new TodoPage(page);
     |                      ^ TypeError: _todoPages.TodoPage is not a constructor
  6  |     await todoPage.goto();
  7  |     await todoPage.addTodo('milk');
  8  | 
  9  |   // Expect a title "to contain" a substring.
  10 |   await expect(page.getByTestId("todo-title")).toHaveText("milk");
  11 | });
```