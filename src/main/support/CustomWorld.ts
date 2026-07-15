import { BrowserContext, Browser, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    // Add one line per Page Object as you create it for the new site, e.g.:
    // loginPage!: LoginPage;
}

setWorldConstructor(CustomWorld);