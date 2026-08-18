import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class HomePage extends BasePage {
    private exportButton = this.page.getByRole("button", {name: "EXPORT TO EXCEL"});
    private dataRows = this.page.locator("tbody tr");

    private dropDownOptions = this.page.locator("//ul[@class= 'MuiList-root MuiList-padding MuiMenu-list css-ubifyk' ]/li");

    private async getFilter (key: number) {
        const xpath = `//tr[@class = 'MuiTableRow-root MuiTableRow-head css-1n1e43z']/th[${key}]/div/div/input`
        return this.page.locator(xpath);
    }

    private getFilterIndex (option: string) : number {
        
        let index: number;

        switch (option) {
            case "Project Name":
                index = 1;
                break;

            case "Training Type":
                index = 6;
                break;

            case "Status":
                index = 9;
                break;

            default:
                throw new Error(`Invalid filter option: ${option}`);
        }

        return index;

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

    private selectedFilterValue: string = "";

    async selectFilterOption(option: string): Promise<string> {

        let index: number = this.getFilterIndex(option);

        const filter = await this.getFilter(index);

        await filter.click();

        const options = this.dropDownOptions;

        const count = await options.count();

        if (count === 0) {
            throw new Error(`No dropdown options found for ${option}`);
        }

        const selectedOption = options.first();

        this.selectedFilterValue = (
            await selectedOption.innerText()
        ).trim();

        await selectedOption.click();

        return this.selectedFilterValue;
    }

    
    async verifyFilteredRecords(option: string, expectedValue: string) {

        let columnIndex: number = this.getFilterIndex(option);

        const rows = this.dataRows;
        const rowCount = await rows.count();

        if (rowCount === 0) {
            throw new Error(
                `No records found after applying ${option} filter`
            );
        }

        for (let i = 0; i < rowCount; i++) {

            const cell = rows.nth(i).locator(
                `td:nth-child(${columnIndex})`
            );

            const actualValue = (
                await cell.innerText()
            ).trim();

            if (actualValue !== expectedValue) {
                throw new Error(
                    `${option} filter failed. ` +
                    `Expected "${expectedValue}" but found "${actualValue}" ` +
                    `in row ${i + 1}`
                );
            }
        }
    }
}