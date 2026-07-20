import { Browser, BrowserContext, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { EditEmployeePage } from "../../test/pages/EditEmployeePage";
import { AddTraineePage } from "../../test/pages/AddTraineePage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    addTraineePage!: AddTraineePage;
    editEmployeePage!: EditEmployeePage;
}

setWorldConstructor(CustomWorld);
