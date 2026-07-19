import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddTraineePage extends BasePage {

    readonly trainingSummaryIcon: Locator;
    readonly addIcon: Locator;
    readonly projectName: Locator;
    readonly empId: Locator;
    readonly employeeName: Locator;
    readonly course: Locator;
    readonly trainerName: Locator;
    readonly trainingType: Locator;
    readonly startDate: Locator;
    readonly endDate: Locator;
    readonly status: Locator;
    readonly percentage: Locator;
    readonly addButton: Locator;

    constructor(page: Page) {
        super(page);

        this.trainingSummaryIcon = page.getByRole("button", { name: "Training Summary" });
        this.addIcon = page.getByRole("button", { name: "Add Training" });

        this.projectName = page.locator('input[role="combobox"]').first();
        this.empId = page.getByPlaceholder("EMP ID *");
        this.employeeName = page.getByPlaceholder("Employee Name *");
        this.course = page.getByPlaceholder("Course *");
        this.trainerName = page.getByPlaceholder("Trainer Name *");
        this.trainingType = page.locator('input[role="combobox"]').nth(1);
        this.startDate = page.locator('input[type="date"]').first();
        this.endDate = page.locator('input[type="date"]').nth(1);
        this.status = page.locator('input[role="combobox"]').nth(2);
        this.percentage = page.getByPlaceholder("% Completed *");
        this.addButton = page.getByRole("button", { name: "ADD" });
    }

    async launchApplication() {
        await this.page.goto("https://frontend-69a7.vercel.app/");
    }

    async navigateToEmployeeTrainingPage() {
        await this.click(this.trainingSummaryIcon);
    }

    async clickAddIcon() {
        await this.click(this.addIcon);
    }

    async enterTraineeDetails(data: any) {

        await this.fill(this.projectName, data.projectName);
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");

        await this.fill(this.empId, data.empId);

        await this.fill(this.employeeName, data.employeeName);

        await this.fill(this.course, data.course);

        await this.fill(this.trainerName, data.trainerName);

        await this.fill(this.trainingType, data.trainingType);
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");

        await this.fill(this.startDate, data.startDate);

        await this.fill(this.endDate, data.endDate);

        await this.fill(this.status, data.status);
        await this.page.keyboard.press("ArrowDown");
        await this.page.keyboard.press("Enter");

        await this.fill(this.percentage, data.percentage);
    }

    async clickAddButton() {
        await this.click(this.addButton);
    }

    async verifyEmployeeAdded(employeeName: string) {

        const employee = this.page.locator("table tbody tr").filter({
            hasText: employeeName
        });

        expect(await this.isVisible(employee)).toBeTruthy();
    }

}