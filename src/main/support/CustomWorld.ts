import { BrowserContext, Browser, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { EditEmployeePage } from "../../test/pages/EditEmployeePage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    editEmployee!: EditEmployeePage;
}

setWorldConstructor(CustomWorld);
