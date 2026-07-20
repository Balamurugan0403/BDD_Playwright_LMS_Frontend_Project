import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

Given("user is on the Employee training records page", async function (this: CustomWorld) {
    await this.editEmployeePage.navigateToEmployeeTrainingPage();
});

When("User clicks the edit icon of an existing training record", async function (this: CustomWorld) {
    await this.editEmployeePage.clickEditIcon();
});

When("User updates all editable fields with valid data", async function (this: CustomWorld) {
    await this.editEmployeePage.updateTrainingDetails();
});

When("User clicks the Update button", async function (this: CustomWorld) {
    await this.editEmployeePage.clickUpdateButton();
});

Then("Employee Training record should be updated successfully",async function (this: CustomWorld) {
       await this.editEmployeePage.verifyEmployeeTrainingUpdated();
});