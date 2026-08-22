import { BasePage } from "./BasePage";
import { expect, Locator } from "@playwright/test";
import { logger } from "../../main/utils/logger";

export class HomePage extends BasePage {
    private exportButton = this.page.getByRole("button", {name: "EXPORT TO EXCEL"});
    private dataRows = this.page.locator("tbody tr");


    private async getFilter (key: number) {
        const xpath = `//tr[@class = 'MuiTableRow-root MuiTableRow-head css-1n1e43z']/th[${key}]/div/div/input`
        return this.page.locator(xpath);
    }

    private async getDropdownOptions(key: number): Promise<Locator>{
        const xpath = `//thead/tr[2]/th[${key}]//li[@role= "menuitem"]`
        await this.click(this.page.locator(xpath));

        return this.page.locator("//ul[@class= 'MuiList-root MuiList-padding MuiMenu-list css-ubifyk' ]/li");

    }

    private getFilterIndex (option: string) : number {
        
        let index: number;

        switch (option) {
            case "Project Name":
                index = 1;
                break;
            
            case "EMP ID":
                index = 2;
                break;

            case "Employee Name":
                index = 3;
                break;

            case "Course":
                index = 4;
                break;

            case "Trainer Name":
                index = 5;
                break;

            case "Project Name":
                index = 1;
                break;

            
            case "Training Type":
                index = 6;
                break;

            case "Start Date":
                index = 7;
                break;

            case "End Date":
                index = 8;
                break;

            case "Status":
                index = 9;
                break;

            case "Percentage Completed":
                index = 10;
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

    private filteredRow!: Locator;
    private filteredRowCountBeforeDelete: number = 0;

    async filterTrainee(empId: string, employeeName: string, course: string) {
        logger.info(`Filtering trainee EMP ID: ${empId}, Name: ${employeeName}, Course: ${course}`);

        this.filteredRow = this.dataRows
            .filter({ has: this.page.locator("td:nth-child(2)", { hasText: new RegExp(`^\\s*${empId}\\s*$`) }) })
            .filter({ has: this.page.locator("td:nth-child(3)", { hasText: new RegExp(`^\\s*${employeeName}\\s*$`) }) })
            .filter({ has: this.page.locator("td:nth-child(4)", { hasText: new RegExp(`^\\s*${course}\\s*$`) }) });
    }

    async verifyFilteredRecordVisible() {
        await expect(this.filteredRow.first()).toBeVisible({
            timeout: 20000
        });
    }

    async clickDeleteIcon() {
        const row = this.filteredRow.first();

        await expect(row).toBeVisible({
            timeout: 20000
        });
        this.filteredRowCountBeforeDelete = await this.filteredRow.count();

        await row.getByRole("button", { name: /Delete/i }).click();
        await this.page.waitForTimeout(2000);
    }

    async verifyRowRemoved() {
        await expect(this.filteredRow).toHaveCount(
            this.filteredRowCountBeforeDelete - 1,
            { timeout: 10000 }
        );
    }

    private selectedFilterValue: string = "";

    async selectFilterOption(option: string): Promise<string> {

        let index: number = this.getFilterIndex(option);
        logger.info("The index of the filter option is: "+index);
        const filter = await this.getFilter(index);

        const options = await this.getDropdownOptions(index);

        const count = await options.count();

        if (count === 0) {
            throw new Error(`No dropdown options found for ${option}`);
        }

        const selectedOption = options.nth(1);
        
        this.selectedFilterValue = (
            await selectedOption.innerText()
        ).trim();
        logger.info("The selected option: "+ this.selectedFilterValue);
        await this.click(selectedOption);

        return this.selectedFilterValue;
    }


    async verifyFilteredRecords(option: string, expectedValue: string) {

        let columnIndex: number = this.getFilterIndex(option);

        const rows = this.dataRows;
        const rowCount = await rows.count();

        if (rowCount === 0) {
            logger.warn(`No records found for the option '${option}' and value '${expectedValue}'`)
        }

        for (let i = 0; i < rowCount; i++) {

            const cell = rows.nth(i).locator(
                `td:nth-child(${columnIndex})`
            );

            const actualValue = (
                await cell.innerText()
            ).trim();

            if(columnIndex === 7 || columnIndex === 8) {
                const expectedDate = expectedValue.split("-").sort();
                const actualDate = actualValue.split("/").sort();

                expect(actualDate).toEqual(expectedDate);
            }

            else if (!actualValue.includes(expectedValue)) {
                throw new Error(
                    `${option} filter failed. ` +
                    `Expected "${expectedValue}" but found "${actualValue}" ` +
                    `in row ${i + 1}`
                );
            }
        }
    }

    async enterTextInFilter(option: string, key: string) {

        let index: number = this.getFilterIndex(option);
        logger.info("The index of the filter option is: "+index);
        const filter = await this.getFilter(index);

        await this.fill(filter, key);
    }
}