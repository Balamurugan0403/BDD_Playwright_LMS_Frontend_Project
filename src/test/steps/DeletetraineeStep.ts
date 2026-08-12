import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

// NOTE: "user is on the homepage of the site" is already defined in AddTraineeStep.ts.

Given("user filters the trainee {string} with name {string} and course {string}", { timeout: 20 * 1000 }, async function (this: CustomWorld, empId: string, employeeName: string, course: string) {
    await this.deleteTraineePage.filterTrainee(empId, employeeName, course);
});

Then("user should see the filtered trainee record", { timeout: 20 * 1000 }, async function (this: CustomWorld) {
    await this.deleteTraineePage.verifyFilteredRowVisible();
});

When("user clicks the delete icon for the filtered record", { timeout: 20 * 1000 }, async function (this: CustomWorld) {
    await this.deleteTraineePage.clickDeleteIcon();
});

Then("the filtered trainee record should be deleted successfully", { timeout: 20 * 1000 }, async function (this: CustomWorld) {
    await this.deleteTraineePage.verifyRowRemoved();
});
