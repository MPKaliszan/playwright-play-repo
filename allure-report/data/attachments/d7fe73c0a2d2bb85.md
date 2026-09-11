# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: todos.spec.js >> Add milk
- Location: tests\todos.spec.js:3:5

# Error details

```
TypeError: page.getByPlaceholder(...).fill(...).press is not a function
```

```
Error: locator.fill: Test ended.
Call log:
  - waiting for getByPlaceholder('What needs to be done?')
    - locator resolved to <input class="new-todo" placeholder="What needs to be done?"/>

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
  1 | import { test, expect } from '@playwright/test';
  2 | 
  3 | test('Add milk', async ({ page }) => {
  4 |   await page.goto('https://demo.playwright.dev/todomvc/');
> 5 |   await page.getByPlaceholder("What needs to be done?").fill("milk").press("enter");
    |                                                         ^ Error: locator.fill: Test ended.
  6 | 
  7 |   // Expect a title "to contain" a substring.
  8 |   await expect(page.getByTestId("todo-title")).toHaveText("milk");
  9 | });
```