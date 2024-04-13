import { test, expect, chromium } from '@playwright/test';



test('get started link', async () => {
  // cy.get('h4.subapp-loading').contains('Loading...');

  // cy.wait(1000);

  // cy.get('div.app-title]').contains('React Demo');

  // cy.url().should('include', 'react16');


  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:7099/');

  await page.waitForSelector('h4.subapp-loading:has-text("Loading...")');
  await page.waitForTimeout(3000);
  await page.waitForSelector('div.app-title:has-text("React Demo")');

  expect(page.url()).toContain('react16');

  await browser.close();
});
