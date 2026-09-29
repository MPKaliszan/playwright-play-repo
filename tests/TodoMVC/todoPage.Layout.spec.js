import * as allure from 'allure-js-commons';
import { test, expect } from '../../fixtures/todo.fixture';

test('Check for correct header', async({todoPage}) => {
  const expectedHeader = "todos";
  await expect( todoPage.headerText).toBeVisible();
  await expect( todoPage.headerText,
    `Expected header to contain "${expectedHeader}"`)
    .toHaveText(expectedHeader)
});

test('Check for correct warning', async({todoPage}) => {
  const expectedWarning = "This is just a demo of TodoMVC for testing, not the real TodoMVC app.";
  await expect( todoPage.topWarningTextContent()).toBeVisible();
  await expect( todoPage.topWarningTextContent(),
    `Expected header to contain "${expectedWarning}"`)
    .toHaveText(expectedWarning)
});

test('Check for correct footer', async({todoPage}) => {
  const expectedFooters = ["Double-click to edit a todo","Created by Remo H. Jansen","Part of TodoMVC"] ;
  //wait for footers to be visible, then take the text strings from expectedFooters and check if text contains those strings in any order
  await expect( todoPage.footers).toBeVisible();
  for (const text of expectedFooters) {
    await expect(todoPage.footers).toContainText(text);
  }

  //Validate the existence of links within the text
  await expect(
    todoPage.footers.getByRole("link", { name: "Remo H. Jansen" })
).toHaveAttribute("href", "http://github.com/remojansen/");
  await expect(
    todoPage.footers.getByRole("link",{ name: "TodoMVC" })
).toHaveAttribute("href", "http://todomvc.com");
});