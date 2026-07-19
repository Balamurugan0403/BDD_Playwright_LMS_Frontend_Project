import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser } from '@playwright/test';

import { CustomWorld } from '../../main/support/CustomWorld';
import { config } from '../../main/config/config';
import { logger } from '../../main/utils/logger';

import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage';
import { CourseStructurePage } from '../pages/CourseStructurePage';
import { CourseCategoryPage } from '../pages/CourseCategoryPage';
import { DynamicFieldManagementPage } from '../pages/DynamicFieldManagementPage';
import { AddCoursePage } from '../pages/AddCoursePage';
import { SearchCoursePage } from '../pages/SearchCoursePage';
import { CourseFilterPage } from '../pages/CourseFilterPage';
import { EditCoursePage } from '../pages/EditCoursePage';
import { PedagogyPage } from '../pages/PedagogyPage';
import { ServiceModelPage } from '../pages/ServiceModelPage';
import { TrainingSummaryPage } from '../pages/TrainingSummaryPage';
import { AddTraineePage } from '../pages/AddTraineePage';

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

    this.loginPage = new LoginPage(this.page);
    this.sidebarPage = new SidebarPage(this.page);
    this.courseStructurePage = new CourseStructurePage(this.page);
    this.courseCategoryPage = new CourseCategoryPage(this.page);
    this.dynamicFieldManagementPage = new DynamicFieldManagementPage(this.page);
    this.addCoursePage = new AddCoursePage(this.page);
    this.searchCoursePage = new SearchCoursePage(this.page);
    this.courseFilterPage = new CourseFilterPage(this.page);
    this.editCoursePage = new EditCoursePage(this.page);
    this.pedagogyPage = new PedagogyPage(this.page);
    this.serviceModelPage = new ServiceModelPage(this.page);
    this.trainingSummaryPage = new TrainingSummaryPage(this.page);
    this.addTraineePage = new AddTraineePage(this.page);

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