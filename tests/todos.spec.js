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