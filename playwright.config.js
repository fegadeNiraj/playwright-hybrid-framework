// @ts-check
const { defineConfig } = require('@playwright/test');
require('dotenv').config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  reporter: 'html',
  timeout: 30000,
  retries: 1,

  use: {
    headless: process.env.CI ? true : false || process.env.HEADLESS === 'true',
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    baseURL: 'https://rahulshettyacademy.com',
    browserName:'chromium',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
});

