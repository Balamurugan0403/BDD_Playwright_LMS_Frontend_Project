import { BasePage } from "./BasePage";

export class ExportexcelPage extends BasePage {
    private readonly exportButton = this.page.getByRole("button", {name: "EXPORT TO EXCEL"});

    async exportEmployeeDetails() {
        const downloadEvent = this.page.waitForEvent("download");
        await this.click(this.exportButton);
        return await downloadEvent;
    }
}