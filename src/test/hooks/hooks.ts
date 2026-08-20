import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser } from '@playwright/test';

import { CustomWorld } from '../../main/support/CustomWorld';
import { config } from '../../main/config/config';
import { logger } from '../../main/utils/logger';

import { EditEmployeePage } from '../pages/EditEmployeePage';
import { AddTraineePage } from '../pages/AddTraineePage';
import { HomePage } from '../pages/HomePage';

let browser: Browser;

BeforeAll({ timeout: 30 * 1000 }, async () => {
    try {
        if (config.browser === "chromium") {
            logger.info("Launching Chrome browser");

            browser = await chromium.launch({
                headless: config.headless,
                slowMo: config.slowMo
            });

        } else if (config.browser === "firefox") {
            logger.info("Launching Firefox browser");

            browser = await firefox.launch({
                headless: config.headless,
                slowMo: config.slowMo
            });

        } else {
            logger.info("Launching WebKit browser");

            browser = await webkit.launch({
                headless: config.headless,
                slowMo: config.slowMo
            });
        }

        logger.info(`${config.browser} browser launched successfully`);

    } catch (error) {
        logger.error(`Failed to launch ${config.browser} browser`, error);
        throw error;
    }
});

Before(async function (this: CustomWorld) {

    this.browser = browser;

    this.context = await browser.newContext();

    this.page = await this.context.newPage();

    this.addTraineePage = new AddTraineePage(this.page);
    this.editEmployeePage = new EditEmployeePage(this.page);
    this.homePage = new HomePage(this.page);
});

After(async function (this: CustomWorld, scenario) {

    if (scenario.result?.status === "FAILED") {

        const screenshot = await this.page.screenshot({
            fullPage: true
        }); 

        this.attach(screenshot,"image/png");

        const screenshotPath =
            `reports/screenshots/${Date.now()}.png`;

        await this.page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

    }

    await this.page.close();
    await this.context.close();
});

AfterAll({ timeout: 30 * 1000 }, async () => {

    if (browser) {
        await browser.close();
    }

    logger.info("Browser closed successfully");
});