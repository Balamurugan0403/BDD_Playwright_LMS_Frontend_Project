import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class HomePage extends BasePage {
    private exportButton = this.page.getByRole("button", {name: "EXPORT TO EXCEL"});
    private dataRows = this.page.locator("tbody tr");

    private projectNameOptions = this.page.locator("class='MuiList-root MuiList-padding MuiMenu-list css-ubifyk'");

    private async getFilter (key: string) {
        const xpath = `MuiTableRow-root MuiTableRow-head css-1n1e43z']/th[${key}]/div/div/input`
        return this.page.locator(xpath);
    }

    async exportEmployeeDetails() {
        logger.info("Clicking Export to Excel button");
        const downloadEvent = this.page.waitForEvent("download");
        await this.click(this.exportButton);
        logger.info("Excel file downloaded successfully");
        return await downloadEvent;
    }

    async clickDeleteIcon() {
        const row = this.dataRows.first();

        await expect(row).toBeVisible({
            timeout: 20000
        });
        await row.getByRole("button", { name: /Delete/i }).click();
        await this.page.waitForTimeout(2000);
    }

    async verifyRowRemoved() {
        await this.page.waitForTimeout(500);
    }
}