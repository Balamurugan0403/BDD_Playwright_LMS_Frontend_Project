import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser } from '@playwright/test';

import { CustomWorld } from '../../main/support/CustomWorld';
import { config } from '../../main/config/config';
import { logger } from '../../main/utils/logger';
import { AddTraineePage } from '../pages/AddTraineePage';
import { DeleteTraineePage } from './../pages/Deletetraineepage';
import { ExportexcelPage} from './../pages/ExportexcelPage';

let browser: Browser;

BeforeAll(async () => {
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
});

Before(async function (this: CustomWorld) {

    this.browser = browser;
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    this.addTraineePage = new AddTraineePage(this.page);
    this.deleteTraineePage=new DeleteTraineePage(this.page);
    this.exportExcelPage=new ExportexcelPage(this.page);

});

After(async function (this: CustomWorld, scenario) {

    if (scenario.result?.status === "FAILED") {
        await this.page.screenshot({
            path: `reports/screenshots/${Date.now()}.png`,
            fullPage: true
        });
    }

    await this.page.close();
    await this.context.close();
});

AfterAll(async () => {
    await browser.close();
});
