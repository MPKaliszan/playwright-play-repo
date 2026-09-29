import {test as base} from '@playwright/test';
import { todoPages} from '../pages/todoPages.ts';

export const test = base.extend({
    todoPage: async ({page} , use) => {
        const todoPage = new todoPages(page);
        await todoPage.goto();

        await use(todoPage);
    },
});

export { expect } from '@playwright/test';