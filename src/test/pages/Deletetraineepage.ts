import { expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DeleteTraineePage extends BasePage {

    private getTraineeRow(empId: string): Locator {
        return this.page
            .locator("tr")
            .filter({ hasText: empId })
            .first();
    }

    private getEmpCell(empId: string): Locator {
        return this.getTraineeRow(empId).getByText(empId, {
            exact: true
        });
    }


    private getDeleteButton(empId: string): Locator {
        return this.getTraineeRow(empId).getByRole("button", {
            name: /delete/i
        });
    }


    private getConfirmDeleteButton(): Locator {
        return this.page.getByRole("button", {
            name: /yes|confirm|delete/i
        }).last();
    }

    async verifyTraineeExists(empId: string): Promise<void> {

        const row = this.getTraineeRow(empId);

        await expect(row).toBeVisible({
            timeout: 10000
        });

        console.log(`Trainee ${empId} is available in the list`);
    }

    async clickDeleteIcon(empId: string): Promise<void> {

        const row = this.getTraineeRow(empId);

        await expect(row).toBeVisible({
            timeout: 10000
        });

        const deleteButton = this.getDeleteButton(empId);

        await expect(deleteButton).toBeVisible({
            timeout: 10000
        });

        await deleteButton.click();

        console.log(`Delete button clicked for trainee ${empId}`);
    }

    async confirmDelete(): Promise<void> {

        const confirmButton = this.getConfirmDeleteButton();

        await expect(confirmButton).toBeVisible({
            timeout: 10000
        });

        await confirmButton.click();

        console.log("Delete action confirmed");
    }

    async verifyDeleteSuccessful(empId: string): Promise<void> {

        const row = this.getTraineeRow(empId);

        await expect(row).toHaveCount(0, {
            timeout: 10000
        });

        console.log(`Trainee ${empId} deleted successfully`);
    }
}
