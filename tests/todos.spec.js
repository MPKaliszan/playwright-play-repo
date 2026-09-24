import { test, expect } from '@playwright/test';
import { todoPages } from './pages/todoPages';
import * as allure from 'allure-js-commons';

let todoPage

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
    todoPage = new todoPages(page);
    await todoPage.goto();

});

test('Add milk', async ({ page }) => {
    await todoPage.addTodo('milk');
  // Expect a title "to contain" a substring.
  await expect(page.getByTestId("todo-title")).toHaveText("milk");
});

test('Make task, then complete it', async({page}) => {
  const milk = "milk";
  await todoPage.addTodo(milk);
  await todoPage.markComplete(milk);
  await expect(todoPage.todoItem(milk)).toHaveClass('completed');
    
});

test('Make task, complete, then delete it', async({page}) => {
  const milk = "milk";
  await todoPage.addTodo(milk);
  await todoPage.markComplete(milk);
  await allure.attachment('Step Screenshot', await page.screenshot(), 'image/png');
  await todoPage.deleteTodo(milk);
  await allure.attachment('Step Screenshot', await page.screenshot(), 'image/png');
  await expect(todoPage.todoItem(milk)).not.toBeVisible();
});

test('Add several items, be sure they are all visible',async({page}) => {
  await todoPage.addTodo("buy eggs");
  await todoPage.addTodo("Get Greggs");
  await todoPage.addTodo("drink keggs");
  await expect(todoPage.todoItem("buy eggs")).toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).toBeVisible();
  await expect(todoPage.todoItem("drink keggs")).toBeVisible();
});

test('Click through filtering buttons, confirm functionality',async({page}) => {
  await todoPage.addTodo("Cool thing");
  await todoPage.addTodo("Get Greggs");
  await todoPage.markComplete("Cool thing");

  await todoPage.clickButton("Active");
  await expect(todoPage.todoItem("Cool thing")).not.toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).toBeVisible();

  await todoPage.clickButton("Completed");
  await allure.attachment('Step Screenshot', await page.screenshot(), 'image/png');
  await expect(todoPage.todoItem("Cool thing")).toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).not.toBeVisible();

  await todoPage.clickButton("All");
  await expect(todoPage.todoItem("Cool thing")).toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).toBeVisible();
  
});

test('Check for correct header', async({page}) => {
  const expectedHeader = "todos";
  await expect( todoPage.headerText).toBeVisible();
  await expect( todoPage.headerText,
    `Expected header to contain "${expectedHeader}"`)
    .toHaveText(expectedHeader)
});

test('Check for correct warning', async({page}) => {
  const expectedWarning = "This is just a demo of TodoMVC for testing, not the real TodoMVC app.";
  await expect( todoPage.topWarningTextContent()).toBeVisible();
  await expect( todoPage.topWarningTextContent(),
    `Expected header to contain "${expectedWarning}"`)
    .toHaveText(expectedWarning)
});

test('Check for correct footer', async({page}) => {
  const expectedFooter1 = "Double-click to edit a todo";
  const expectedFooter2 = "Created by Remo H. Jansen";
  const expectedFooter3 = "Part of TodoMVC";

  await expect( todoPage.footers).toBeVisible();
  await expect( todoPage.footers,
    `Expected header to contain "${expectedFooter1}"`)
    .toHaveText(expectedFooter1) ;
  await expect( todoPage.footers,
    `Expected header to contain "${expectedFooter2}"`)
    .toHaveText(expectedFooter2)
  await expect( todoPage.footers,
    `Expected header to contain "${expectedFooter3}"`)
    .toHaveText(expectedFooter3)
});