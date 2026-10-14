import {test,expect} from '@playwright/test'

test('Test the animated button no matter where it is', async({page}) => {
    await page.goto('http://uitestingplayground.com/animation')
    await page.getByRole('button',{name: "Moving Target"}).click();
    await expect(page.getByText("Moving Target clicked. It's class name is 'btn btn-primary'")).toBeVisible()
    await page.locator('#animationButton').click();
    await expect(page.getByRole('button',{name: "Moving Target"}))
    await expect(page.getByText("Animating the button...")).toBeVisible()
    await page.getByRole('button',{name: "Moving Target"}).click({
    force: true
});
    
    await expect(page.getByText("Moving Target clicked. It's class name is 'btn btn-primary spin'")).toBeVisible()

})