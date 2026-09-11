# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todos.spec.js >> Make task, complete, then delete it
- Location: tests\todos.spec.js:27:5

# Error details

```
ReferenceError: allure is not defined
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app." [ref=e3] [cursor=pointer]:
      - /url: https://todomvc.com/
  - generic [ref=e5]:
    - generic [ref=e6]:
      - heading "todos" [level=1] [ref=e7]
      - textbox "What needs to be done?" [ref=e8]
    - generic [ref=e9]:
      - checkbox "❯Mark all as complete" [checked] [ref=e10]
      - generic [ref=e11]: ❯Mark all as complete
      - list [ref=e12]:
        - listitem [ref=e13]:
          - generic [ref=e14]:
            - checkbox "Toggle Todo" [checked] [active] [ref=e15]
            - generic [ref=e16]: milk
            - button "Delete" [ref=e17]: ×
    - generic [ref=e18]:
      - generic [ref=e19]:
        - strong [ref=e20]: "0"
        - text: items left
      - list [ref=e21]:
        - listitem [ref=e22]:
          - link "All" [ref=e23] [cursor=pointer]:
            - /url: "#/"
        - listitem [ref=e24]:
          - link "Active" [ref=e25] [cursor=pointer]:
            - /url: "#/active"
        - listitem [ref=e26]:
          - link "Completed" [ref=e27] [cursor=pointer]:
            - /url: "#/completed"
      - button "Clear completed" [ref=e28] [cursor=pointer]
  - contentinfo [ref=e29]:
    - paragraph [ref=e30]: Double-click to edit a todo
    - paragraph [ref=e31]:
      - text: Created by
      - link "Remo H. Jansen" [ref=e32] [cursor=pointer]:
        - /url: http://github.com/remojansen/
    - paragraph [ref=e33]:
      - text: Part of
      - link "TodoMVC" [ref=e34] [cursor=pointer]:
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
  8  |     todoPage = new todoPages(page);
  9  |     await todoPage.goto();
  10 | 
  11 | });
  12 | 
  13 | test('Add milk', async ({ page }) => {
  14 |     await todoPage.addTodo('milk');
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
  26 | 
  27 | test('Make task, complete, then delete it', async({page}) => {
  28 |   const milk = "milk";
  29 |   await todoPage.addTodo(milk);
  30 |   await todoPage.markComplete(milk);
> 31 |   allure.screenshot({ path: 'screenshot.png', fullPage: true });
     |   ^ ReferenceError: allure is not defined
  32 |   await todoPage.deleteTodo(milk);
  33 |   allure.screenshot.screenshot({ path: 'screenshot2.png', fullPage: true });
  34 |   await expect(todoPage.todoItem(milk)).toBeNull;
  35 | });
```