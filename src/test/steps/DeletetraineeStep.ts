import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

Given(
    "user searches for the trainee {string} in the filter",
    { timeout: 30000 },
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.searchTrainee(empId);
    }
);

Then(
    "user should see the trainee {string} in the filtered list",
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.verifyTraineeVisible(empId);
    }
);

When(
    "user clicks on the delete icon for trainee {string}",
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.clickDeleteIcon(empId);
    }
);

When(
    "user confirms the delete action",
    async function (this: CustomWorld) {
        await this.deleteTraineePage.confirmDelete();
    }
);

Then(
    "the trainee {string} should be deleted successfully",
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.verifyDeleteSuccessful();
    }
);

When(
    "user searches again for the trainee {string} in the filter",
    { timeout: 30000 },
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.searchTrainee(empId);
    }
);

Then(
    "the trainee {string} should not be shown in the list",
    async function (this: CustomWorld, empId: string) {
        await this.deleteTraineePage.verifyTraineeNotVisible(empId);
    }
);
