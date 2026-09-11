# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todos.spec.js >> Add milk
- Location: tests\todos.spec.js:13:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'addTodo')
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app." [ref=e3]:
      - /url: https://todomvc.com/
  - generic [ref=e6]:
    - heading "todos" [level=1] [ref=e7]
    - textbox "What needs to be done?" [active] [ref=e8]
  - contentinfo [ref=e9]:
    - paragraph [ref=e10]: Double-click to edit a todo
    - paragraph [ref=e11]:
      - text: Created by
      - link "Remo H. Jansen" [ref=e12]:
        - /url: http://github.com/remojansen/
    - paragraph [ref=e13]:
      - text: Part of
      - link "TodoMVC" [ref=e14]:
        - /url: http://todomvc.com
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { todoPages } from './pages/todoPages';
  3  | 
  4  | let todoPage
  5  | 
  6  | test.beforeEach(async ({ page }) => {
  7  |   // Runs before each test and signs in each page.
  8  |     const todoPage = new todoPages(page);
  9  |     await todoPage.goto();
  10 | 
  11 | });
  12 | 
  13 | test('Add milk', async ({ page }) => {
> 14 |     await todoPage.addTodo('milk');
     |                    ^ TypeError: Cannot read properties of undefined (reading 'addTodo')
  15 |   // Expect a title "to contain" a substring.
  16 |   await expect(page.getByTestId("todo-title")).toHaveText("milk");
  17 | });
  18 | 
  19 | test('Make task, then complete it', async({page}) => {
  20 |   const milk = "milk";
  21 |   await todoPage.addTodo(milk);
  22 |   await todoPage.markComplete(milk);
  23 |   await expect(todoPage.todoItem(milk)).toHaveClass('completed');
  24 |     
  25 | });
```