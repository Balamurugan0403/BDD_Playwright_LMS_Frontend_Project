import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { config } from "../../main/config/config"
import { logger } from '../../main/utils/logger';

export class EditEmployeePage extends BasePage {

    private readonly editIcon = this.page.locator("//tr[td[contains(normalize-space(),'Demo')]]//button[@aria-label='edit']");
    private readonly course = this.page.locator('//input[@name="course"]');
    private readonly trainername = this.page.locator('//input[@name="trainerName"]');
    private readonly startDate = this.page.locator('//input[@name="startDate"]');
    private readonly endDate = this.page.locator('//input[@name="endDate"]');
    private readonly status = this.page.getByRole('combobox', { name: 'Status' });
    private readonly completed =this.page.getByLabel('% Completed');
    private readonly updateButton = this.page.getByRole('button', { name: 'UPDATE' });

    async navigate() {
        logger.info("Launching the Application");
        await this.page.goto(config.baseUrl);
    }

    async clickEditIcon() {
        logger.info("Clicking the edit icon");
        await expect(this.editIcon.first()).toBeVisible({ timeout: 30000 });
        await this.click(this.editIcon.first());
    }

     async updateTrainingDetails(course: string, trainer: string) {
        logger.info("Updating the particular details");
        await this.clear(this.course);
        await this.fill(this.course, course);
        await this.clear(this.trainername);
        await this.fill(this.trainername, trainer);

    }

    async updateAllTrainingDetails(course: string,trainer: string,startDate: string,endDate: string,status: string,completed: string) {
        logger.info("Updating the all details");
        await expect(this.course).toBeVisible({timeout: 30000});
        await this.clear(this.course);
        await this.fill(this.course, course);

        await expect(this.trainername).toBeVisible({timeout: 30000});
        await this.clear(this.trainername);
        await this.fill(this.trainername, trainer);
        
        // Start Date
        console.log("Updating Start Date");
        await expect(this.startDate).toBeVisible({timeout: 30000});
        await this.startDate.fill("");
        await this.startDate.fill(startDate);
        await expect(this.startDate).toHaveValue(startDate, {timeout: 30000});
        console.log(`Start Date entered successfully: ${startDate}`);


        // End Date
        console.log("Updating End Date");
        await expect(this.endDate).toBeVisible({timeout: 30000});
        await this.endDate.fill("");
        await this.endDate.fill(endDate);
        await expect(this.endDate).toHaveValue(endDate, {timeout: 30000});
        console.log(`End Date entered successfully: ${endDate}`);

        // Status
        console.log("Updating Status");
        await expect(this.status).toBeVisible({ timeout: 30000 });
        await this.status.click();
        await this.page.getByRole('option', { name: status, exact: true }).click();
        console.log(`Status updated successfully: ${status}`);

        // % Completed
        console.log("Updating % Completed");
        await expect(this.completed).toBeVisible({ timeout: 30000 });
        await this.completed.fill("");
        await this.completed.fill(completed);
        await expect(this.completed).toHaveValue(completed, {timeout: 30000});
        console.log(`% Completed entered successfully: ${completed}`);
    }

    async clickUpdateButton() {
        logger.info("Click update");
        await this.click(this.updateButton);
    }

    async verifyUpdatedCourse(expectedCourse: string) {
        await expect(this.course).toHaveValue(expectedCourse,{timeout: 30000});
    }

    async verifyAllUpdatedTrainingDetails(expectedCourse: string,expectedTrainer: string,expectedStartDate: string,expectedEndDate: string,expectedStatus: string,expectedCompleted: string) {
        await expect(this.course).toHaveValue(expectedCourse,{ timeout: 30000 });
        await expect(this.trainername).toHaveValue(expectedTrainer,{ timeout: 30000 });
        await expect(this.startDate).toHaveValue(expectedStartDate,{ timeout: 30000 });
        await expect(this.endDate).toHaveValue(expectedEndDate,{ timeout: 30000 });
        await expect(this.status).toContainText(expectedStatus, {timeout: 30000});
        await expect(this.completed).toHaveValue(expectedCompleted,{ timeout: 30000 });
    }

}