import * as allure from 'allure-js-commons';
import { test, expect } from '../../fixtures/todo.fixture';

test('Make task, then complete it', async({todoPage}) => {
  const milk = "milk";
  await todoPage.addTodo(milk);
  await todoPage.markComplete(milk);
  await expect(todoPage.todoItem(milk)).toHaveClass('completed');
    
});

test('Make task, complete, then delete it', async({todoPage}) => {
  const milk = "milk";
  await todoPage.addTodo(milk);
  await todoPage.markComplete(milk);
  await allure.attachment('Step Screenshot', await todoPage.screenshot(), 'image/png');
  await todoPage.deleteTodo(milk);
  await allure.attachment('Step Screenshot', await todoPage.screenshot(), 'image/png');
  await expect(todoPage.todoItem(milk)).not.toBeVisible();
});

test('Add several items, be sure they are all visible',async({todoPage}) => {
  await todoPage.addTodo("buy eggs");
  await todoPage.addTodo("Get Greggs");
  await todoPage.addTodo("drink keggs");
  await expect(todoPage.todoItem("buy eggs")).toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).toBeVisible();
  await expect(todoPage.todoItem("drink keggs")).toBeVisible();
});

test('Click through filtering buttons, confirm functionality',async({todoPage}) => {
  await todoPage.addTodo("Cool thing");
  await todoPage.addTodo("Get Greggs");
  await todoPage.markComplete("Cool thing");

  await todoPage.clickButton("Active");
  await expect(todoPage.todoItem("Cool thing")).not.toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).toBeVisible();

  await todoPage.clickButton("Completed");
  await allure.attachment('Step Screenshot', await todoPage.screenshot(), 'image/png');
  await expect(todoPage.todoItem("Cool thing")).toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).not.toBeVisible();

  await todoPage.clickButton("All");
  await expect(todoPage.todoItem("Cool thing")).toBeVisible();
  await expect(todoPage.todoItem("Get Greggs")).toBeVisible();
  
});