import { Browser, BrowserContext, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { TrainingSummaryPage } from "../../test/pages/TrainingSummaryPage";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { DeleteTraineePage } from "../../test/pages/Deletetraineepage";
import { AddTraineePage } from "../../test/pages/AddTraineePage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    addTraineePage!: AddTraineePage;
    deleteTraineePage!:DeleteTraineePage;
}

setWorldConstructor(CustomWorld);
