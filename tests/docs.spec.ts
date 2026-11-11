import { test, expect } from '@playwright/test';

test.describe('playwright.dev docs site', () => {
    //this is to run before each test, so we don't have to repeat the code in each test and sarts from a fresh page
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('home page title contains Playwright', async ({ page }) => {
    //this is to check if the title of the page contains the word Playwright, which is good to verify (web-first assertion)
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('Get started opens the intro docs', async ({ page }) => {
    //this is to check if the Get started link opens the intro docs page
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/\/docs\/intro/);
  });

  test('Installation heading is visible', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('search returns a result for locators', async ({ page }) => {
    //this is to check if the search returns a result for locators
    await page.getByRole('button', { name: 'Search' }).click();
    await page.getByPlaceholder('Search docs').fill('locators');
    await expect(page.getByRole('link', { name: /locators/i }).first()).toBeVisible();
  });
});