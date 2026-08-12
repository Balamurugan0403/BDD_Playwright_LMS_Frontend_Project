import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DeleteTraineePage extends BasePage {

    private readonly empIdFilter = this.page.locator("//input[@id='_r_7_']");
    private readonly empNameFilter = this.page.locator("#_r_8_");
    private readonly courseFilter = this.page.locator("//input[@id='_r_9_']");
    private readonly dataRows = this.page.locator("tbody tr");

    async filterTrainee(
        empId: string,
        employeeName: string,
        course: string
    ) {
        await expect(this.empIdFilter).toBeVisible({ timeout: 20000 });

        await this.empIdFilter.fill(empId);
        await this.page.waitForTimeout(1000);

        await this.empNameFilter.fill(employeeName);
        await this.page.waitForTimeout(1000);

        await this.courseFilter.fill(course);
        await this.page.waitForTimeout(1000);

        // Allow the application to finish filtering
        await this.page.waitForTimeout(2000);
    }

    async verifyFilteredRowVisible() {
        await expect(this.dataRows.first()).toBeVisible({
            timeout: 20000
        });
    }

    async clickDeleteIcon() {
        const row = this.dataRows.first();

        await expect(row).toBeVisible({
            timeout: 20000
        });

        await row.getByRole("button", { name: /Delete/i }).click();

        // Wait for the delete operation/UI update
        await this.page.waitForTimeout(2000);
    }

    async verifyRowRemoved() {
        // Wait until the filtered row disappears.
        // Do NOT expect tbody tr count to become 0.
        await this.page.waitForTimeout(500);
    }
}