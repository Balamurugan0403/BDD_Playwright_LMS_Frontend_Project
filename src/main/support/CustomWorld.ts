import { Browser, BrowserContext, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";

//import { SidebarPage } from "../../test/pages/SidebarPage";
//import { TrainingSummaryPage } from "../../test/pages/TrainingSummaryPage";
import { AddTraineePage } from "../../test/pages/AddTraineePage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

   // sidebarPage!: SidebarPage;
    //trainingSummaryPage!: TrainingSummaryPage;
    addTraineePage!: AddTraineePage;
}

setWorldConstructor(CustomWorld);