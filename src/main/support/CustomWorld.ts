import { Browser, BrowserContext, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";

import { EditEmployeePage } from "../../test/pages/EditEmployeePage";

import { AddTraineePage } from "../../test/pages/AddTraineePage";
import { HomePage } from "../../test/pages/HomePage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    editEmployeePage!: EditEmployeePage;

    addTraineePage!: AddTraineePage;
    homePage!: HomePage;
}

setWorldConstructor(CustomWorld);