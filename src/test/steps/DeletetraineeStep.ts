import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

When(
    "user clicks on the delete icon for trainee {string}",
    { timeout: 30 * 1000 },
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.clickDeleteIcon(empId);
    }
);

When(
    "user confirms the delete action",
    { timeout: 30 * 1000 },
    async function (this: CustomWorld) {
        await this.deleteTraineePage.confirmDelete();
    }
);

Then(
    "the trainee {string} should be deleted successfully",
    { timeout: 30 * 1000 },
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.verifyDeleteSuccessful(empId);
    }
);
