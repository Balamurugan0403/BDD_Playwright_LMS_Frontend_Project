import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class ExportexcelPage extends BasePage {
    private readonly exportButton = this.page.getByRole("button", {name: "EXPORT TO EXCEL"});

    async exportEmployeeDetails() {
        logger.info("Clicking Export to Excel button");
        const downloadEvent = this.page.waitForEvent("download");
        await this.click(this.exportButton);
        logger.info("Excel file downloaded successfully");
        return await downloadEvent;
    }
}