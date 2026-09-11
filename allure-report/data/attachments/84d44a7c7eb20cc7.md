# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todos.spec.js >> Make task, then complete it
- Location: tests\todos.spec.js:13:5

# Error details

```
ReferenceError: todoPage is not defined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { todoPages } from './pages/todoPages';
  3  | 
  4  | test('Add milk', async ({ page }) => {
  5  |     const todoPage = new todoPages(page);
  6  |     await todoPage.goto();
  7  |     await todoPage.addTodo('milk');
  8  | 
  9  |   // Expect a title "to contain" a substring.
  10 |   await expect(page.getByTestId("todo-title")).toHaveText("milk");
  11 | });
  12 | 
  13 | test('Make task, then complete it', async({page}) => {
  14 |   const milk = "milk";
> 15 |   await todoPage.addTodo(milk);
     |   ^ ReferenceError: todoPage is not defined
  16 |   await todoPage.markComplete(milk);
  17 |   await expect(todoPage.todoItem(milk)).toHaveClass('completed');
  18 |     
  19 | });
```