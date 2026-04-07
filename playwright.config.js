// @ts-check
import { defineConfig, devices } from '@playwright/test';

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
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers:3,
  reporter: 'html',
  timeout: 30000,
  retries: 1,

  use: {
    headless: true,
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

