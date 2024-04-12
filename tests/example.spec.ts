import { test, expect } from '@playwright/test';


test('get started link', async ({ page }) => {
    // cy.get('h4.subapp-loading').contains('Loading...');

    // cy.wait(1000);

    // cy.get('div.app-title]').contains('React Demo');

    // cy.url().should('include', 'react16');


  await page.goto('http://localhost:7099');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
