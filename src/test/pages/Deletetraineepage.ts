import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DeleteTraineePage extends BasePage {

    private readonly searchbox = this.page.getByRole("textbox", { name: /Search/i });

    private readonly confirmDeleteBtn = this.page.getByRole("button", { name: /Yes|Confirm|Delete/i });

    private getDeleteIcon(empId: string) {
        return this.page
            .locator("tr", { hasText: empId })
            .getByRole("button", { name: /Delete/i });
    }

    private getEmpCell(empId: string) {
        return this.page.getByRole("cell", { name: empId, exact: true });
    }

    async searchTrainee(empId: string) {
        await this.searchbox.fill(empId);
    }

    async verifyTraineeVisible(empId: string) {
        await expect(this.getEmpCell(empId).first()).toBeVisible({ timeout: 10000 });
    }

    async clickDeleteIcon(empId: string) {
        await this.getDeleteIcon(empId).click();
    }

    async confirmDelete() {
        await this.click(this.confirmDeleteBtn);
    }

    async verifyDeleteSuccessful() {
        await this.page.waitForTimeout(2000);
    }

    async verifyTraineeNotVisible(empId: string) {
        await expect(this.getEmpCell(empId)).toHaveCount(0, { timeout: 10000 });
    }
}