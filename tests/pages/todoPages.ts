import {Page, Locator} from '@playwright/test';

export class todoPages {
    readonly page: Page;
    readonly todoInput: Locator;
    readonly headerText: Locator;
    readonly topWarningText: Locator;
    readonly footers: Locator;


    constructor(page: Page) {
        this.page = page;
        this.todoInput = page.getByPlaceholder('What needs to be done?');
        this.headerText = page.locator(".header");
        this.topWarningText = page.getByText("This is just a demo of TodoMVC for testing, not the real TodoMVC app.")
        this.footers = page.locator(".info");
    }

    todoItem(name: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: name });
}
    topWarningTextContent() {
        return this.topWarningText;
    }


    async goto() {
        await this.page.goto("https://demo.playwright.dev/todomvc");

    }

    async addTodo(todo: string) {
        await this.todoInput.fill(todo);
        await this.todoInput.press('Enter');
    }


    async markComplete(completedTask: string) {
    await this.todoItem(completedTask)
        .getByRole('checkbox')
        .check();
    }

    async deleteTodo(toDeleteTask:string) {
        await this.todoItem(toDeleteTask)
        .getByRole("button").filter()
        .click();
    }

    async clickButton(toClickButton:string) {
    await this.page.getByRole('link', { name: toClickButton }).click();

    }

    

}