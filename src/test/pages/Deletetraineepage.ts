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
        // td[11] (1-indexed XPath) -> nth(10) (0-indexed Playwright)
        // div[1] -> first()
        // button[2] -> nth(1)
        return this.getTraineeRow(empId)
            .locator("td")
            .nth(10)
            .locator("div")
            .first()
            .locator("button")
            .nth(1);
    }

    private getConfirmDeleteButton(): Locator {
        return this.page
            .getByRole("dialog")
            .getByRole("button", { name: /yes|confirm/i });
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
        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) => res.url().includes("/trainee") && res.request().method() === "DELETE",
                { timeout: 15000 }
            ).catch(() => null),
            confirmButton.click()
        ]);

        if (response) {
            console.log(`Delete API responded with status ${response.status()}`);
        } else {
            console.log("No DELETE network call detected within 15s after confirming - check the confirm button locator or endpoint pattern.");
        }

        console.log("Delete action confirmed");
    }

    async verifyDeleteSuccessful(empId: string): Promise<void> {
        const row = this.getTraineeRow(empId);
        try {
            await expect(row).toHaveCount(0, {
                timeout: 10000
            });
            console.log(`Trainee ${empId} deleted successfully`);
        } catch (err) {
            await this.page.screenshot({
                path: `reports/delete-failure-${empId}.png`,
                fullPage: true
            });
            const rowHtml = await row.evaluate((el) => el.outerHTML).catch(() => "row not found");
            console.log(`Row still present for ${empId}. HTML: ${rowHtml}`);
            throw err;
        }
    }
}
