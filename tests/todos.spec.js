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