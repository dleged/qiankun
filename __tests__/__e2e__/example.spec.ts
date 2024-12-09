import { test, expect, chromium } from '@playwright/test';


// async clickAndWaitForResponses(locator: string, urlsToWaitFor: string[]) {
//   const allResponsesPromise = Promise.all(urlsToWaitFor.map(url => page.waitForResponse(url)));
//   await this.page.locator(locator).first().click();
//   const responses = await allResponsesPromise;
// }

// // Calling function
// await clickAndWaitForResponses(`xpath`, ['url1', url3', 'url2']);


test.beforeEach(async ({ page }) => {
  // const browser = await chromium.launch();
  // const page = await browser.newPage();

  await page.waitForTimeout(20 * 1000);
});


test('Application navigation test', async ({ page }) => {
  await page.goto('http://localhost:7099/');
  await page.goto('http://localhost:7099/react16');
  await page.getByRole('button', { name: 'CLICK ME' }).click();
  await page.getByText('Probably the most complete').click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('heading', { name: 'About' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('heading', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'CLICK ME' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByText('React15').click();
  await page.locator('body').click();
  await page.getByText('React version: 15.6.2, AntD version:').click();
  await page.getByRole('button', { name: 'CLICK ME' }).click();
  await page.getByText('$ yarn add qiankun # or npm i').click();
  await page.getByRole('button', { name: '取 消' }).click();
  await page.getByRole('button', { name: 'CLICK ME' }).click();
  await page.getByRole('button', { name: '确 定' }).click();
  await page.getByText('Vue', { exact: true }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('heading', { name: 'This is about page' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
});


test('Style test', async ({ page }) => {

});


test('Global ');


