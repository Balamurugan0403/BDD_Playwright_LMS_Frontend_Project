import { Browser, BrowserContext, Page } from "@playwright/test";
import { World, setWorldConstructor } from "@cucumber/cucumber";
import { SidebarPage } from "../../test/pages/SidebarPage";
import { DeleteTraineePage } from "../../test/pages/Deletetraineepage";
import { AddTraineePage } from "../../test/pages/AddTraineePage";
import { ExportexcelPage} from "../../test/pages/ExportexcelPage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    addTraineePage!: AddTraineePage;
    deleteTraineePage!:DeleteTraineePage;
    exportExcelPage!:ExportexcelPage;
    currentEmployeeName!: string;
    currentCourse!: string;
}

setWorldConstructor(CustomWorld);