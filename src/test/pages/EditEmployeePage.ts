import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
import { config } from "../../main/config/config"
export class EditEmployeePage extends BasePage {

    private readonly editIcon = this.page.locator("//tr[td[contains(normalize-space(),'Demo')]]//button[@aria-label='edit']");
    private readonly course = this.page.locator('//input[@name="course"]');
    private readonly trainername = this.page.locator('//input[@name="trainerName"]');
    private readonly updateButton = this.page.getByRole('button', { name: 'UPDATE' });

    async navigate() {
        await this.page.goto(config.baseUrl);
    }

    async clickEditIcon() {
        await expect(this.editIcon.first()).toBeVisible({ timeout: 30000 });
        await this.click(this.editIcon.first());
    }

     async updateTrainingDetails(course: string, trainer: string) {
        await this.clear(this.course);
        await this.fill(this.course, course);
        await this.clear(this.trainername);
        await this.fill(this.trainername, trainer);

    }

    async clickUpdateButton() {
        await this.click(this.updateButton);
    }
    async verifyUpdatedCourse(expectedCourse: string) {
        await expect(this.course).toHaveValue(expectedCourse);
    }

}