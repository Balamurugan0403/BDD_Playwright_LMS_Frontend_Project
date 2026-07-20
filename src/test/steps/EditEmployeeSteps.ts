import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

Given("user is on the Employee training records page", async function (this: CustomWorld) {
    await this.editEmployee.navigateToEmployeeTrainingPage();
});

When("User clicks the edit icon of an existing training record", async function (this: CustomWorld) {
    await this.editEmployee.clickEditIcon();
});

When("User updates all editable fields with valid data", async function (this: CustomWorld) {
    await this.editEmployee.updateTrainingDetails();
});

When("User clicks the Update button", async function (this: CustomWorld) {
    await this.editEmployee.clickUpdateButton();
});

Then("Employee Training record should be updated successfully",async function (this: CustomWorld) {
       await this.editEmployee.verifyEmployeeTrainingUpdated();
});