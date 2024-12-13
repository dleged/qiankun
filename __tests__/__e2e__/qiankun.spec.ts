import type { Page, Browser } from '@playwright/test';
import { test, expect, chromium } from '@playwright/test';

let browser: Browser;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch();
});

test.afterAll(async () => {
  await browser.close();
});

test.beforeEach(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:7099/react16');
  // Wait for the initial application to load
  await page.waitForLoadState('networkidle');
});

test.afterEach(async () => {
  await page.close();
});

test.describe('Basic Functionality Tests', () => {
  test('Application Loading and Navigation', async () => {
    // Verify main application loading
    await expect(page.locator('header')).toBeVisible();

    // Verify React16 sub-application is loaded
    await expect(page.url()).toContain('/react16');
    await expect(page.getByText('React version: 16')).toBeVisible();

    // Switch to Vue sub-application
    await page.getByText('Vue', { exact: true }).click();
    await expect(page.url()).toContain('/vue');
    await expect(page.getByText('Vue version:')).toBeVisible();
  });

  test('Sub-application Routing System', async () => {
    // React16 sub-application routing
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
  });
});

test.describe('Style Tests', () => {
  test('Styled Components', async () => {
    // Wait for the homePage element to be visible before evaluating
    // await page.waitForSelector('text=This is about page'); // Adjust selector if needed
    const homePage = page.getByText('This is about page');

    // Add this assertion after defining homePage
    const homePageColor = await homePage.evaluate(el => getComputedStyle(el).color);
    expect(homePageColor).toBe('rgb(255, 0, 0)'); // RGB value for red

    // Click the About link
    await page.click('a[href="/about"]'); // Adjust the selector as necessary

    // Wait for the navigation to complete
    await page.waitForLoadState('networkidle');

    // Find the aboutPage element
    await page.waitForSelector('text=This is about page'); // Ensure the element is available
    const aboutPage = page.getByText('This is about page');

    // Add this assertion to check the color
    const aboutPageColor = await aboutPage.evaluate(el => getComputedStyle(el).color);
    expect(aboutPageColor).toBe('rgb(0, 128, 0)'); // RGB value for green// RGB value for green

  });
});

test.describe('Communication Tests', () => {
  test('Global State Sharing', async () => {
    // Here you need to write tests based on your actual global state implementation
    // Modify global state
    await page.getByRole('button', { name: 'CLICK ME' }).click();
    // Verify other applications receive updates
  });
});

test.describe('Performance Tests', () => {
  test('Application Load Time', async () => {
    const startTime = Date.now();
    // Wait for React container with increased timeout
    await expect(page.locator('[data-name="react16"]')).toBeVisible({ timeout: 10000 });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });
});

test.describe('Sandbox Features', () => {
  test('Style Isolation', async () => {
    // Check if Vue application styles affect React application
    await page.getByText('Vue', { exact: true }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-name="vue"]')).toBeVisible({ timeout: 10000 });

    const vueStyles = await page.evaluate(() => {
      const container = document.querySelector('[data-name="vue"]');
      return container ? window.getComputedStyle(container).backgroundColor : null;
    });

    await page.getByText('React16').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-name="react16"]')).toBeVisible({ timeout: 10000 });

    const reactStyles = await page.evaluate(() => {
      const container = document.querySelector('[data-name="react16"]');
      return container ? window.getComputedStyle(container).backgroundColor : null;
    });

    expect(vueStyles).not.toBeNull();
    expect(reactStyles).not.toBeNull();
    expect(vueStyles).not.toBe(reactStyles);
  });

  test('JavaScript Runtime Isolation', async () => {
    // Wait for React16 app to fully load
    await page.waitForLoadState('networkidle');

    // Set a global variable in React16
    await page.evaluate(() => {
      (window as any).__REACT_16_GLOBAL__ = 'react16-value';
    });

    const react16Window = await page.evaluate(() => {
      return (window as any).__REACT_16_GLOBAL__;
    });

    await page.getByText('Vue', { exact: true }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-name="vue"]')).toBeVisible({ timeout: 10000 });

    const vueWindow = await page.evaluate(() => {
      return (window as any).__REACT_16_GLOBAL__;
    });

    expect(react16Window).toBe('react16-value');
    expect(vueWindow).toBeUndefined();
  });
});
