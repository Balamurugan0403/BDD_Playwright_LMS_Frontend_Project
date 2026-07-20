import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { logger } from "../../main/utils/logger";

export class EditEmployeePage extends BasePage {

    //==================== Locators ====================//

    private editIcon = this.page.locator("button[title='Edit']").first();

    private employeeName = this.page.getByRole("textbox", {
        name: /Employee Name/i
    });

    private trainingName = this.page.getByRole("textbox", {
        name: /Training Name/i
    });

    private trainerName = this.page.getByRole("textbox", {
        name: /Trainer Name/i
    });

    private startDate = this.page.getByRole("textbox", {
        name: /Start Date/i
    });

    private endDate = this.page.getByRole("textbox", {
        name: /End Date/i
    });

    private status = this.page.getByRole("combobox", {
        name: /Status/i
    });

    private remarks = this.page.getByRole("textbox", {
        name: /Remarks/i
    });

    private updateButton = this.page.getByRole("button", {
        name: /Update/i
    });

    private successMessage = this.page.getByText(
        /Employee Training updated successfully/i
    );

    //==================== Navigation ====================//

    async navigateToEmployeeTrainingPage() {

        logger.info("Navigating to Employee Training page");

        // If already on the page after login,
        // keep this method empty or navigate using menu.

        // Example:
        // await this.page.goto("https://your-url/employee-training");
    }

    //==================== Edit ====================//

    async clickEditIcon() {

        logger.info("Clicking Edit icon");

        await this.editIcon.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.click(this.editIcon);
    }

    async updateEmployeeName(name: string) {

        logger.info(`Updating Employee Name : ${name}`);

        await this.employeeName.waitFor({
            state: "visible"
        });

        await this.employeeName.fill(name);
    }

    async updateTrainingName(training: string) {

        logger.info(`Updating Training Name : ${training}`);

        await this.trainingName.fill(training);
    }

    async updateTrainerName(trainer: string) {

        logger.info(`Updating Trainer Name : ${trainer}`);

        await this.trainerName.fill(trainer);
    }

    async updateStartDate(date: string) {

        logger.info(`Updating Start Date : ${date}`);

        await this.startDate.fill(date);
    }

    async updateEndDate(date: string) {

        logger.info(`Updating End Date : ${date}`);

        await this.endDate.fill(date);
    }

    async updateStatus(status: string) {

        logger.info(`Updating Status : ${status}`);

        await this.status.selectOption({
            label: status
        });
    }

    async updateRemarks(remarks: string) {

        logger.info(`Updating Remarks : ${remarks}`);

        await this.remarks.fill(remarks);
    }

    //==================== Wrapper Method ====================//

    async updateTrainingDetails() {

        await this.updateEmployeeName("Rohini");

        await this.updateTrainingName("Playwright Automation");

        await this.updateTrainerName("Balamurugan");

        await this.updateStartDate("15/07/2026");

        await this.updateEndDate("20/07/2026");

        await this.updateStatus("Completed");

        await this.updateRemarks("Updated through Playwright Automation");
    }

    //==================== Update ====================//

    async clickUpdateButton() {

        logger.info("Clicking Update button");

        await this.updateButton.waitFor({
            state: "visible",
            timeout: 10000
        });

        await this.click(this.updateButton);
    }

    //==================== Validation ====================//

    async verifyEmployeeTrainingUpdated() {

        logger.info("Verifying Employee Training updated successfully");

        await expect(this.successMessage).toBeVisible({
            timeout: 10000
        });

        logger.info("Employee Training updated successfully");
    }
}