import { BrowserContext, Browser, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { TrainingSummaryPage } from "../../test/pages/TrainingSummaryPage";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { Service } from "../types/Service";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    sidebarPage!: SidebarPage;
    service!: Service
    trainingSummaryPage!:TrainingSummaryPage
}

setWorldConstructor(CustomWorld);
