import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import editData from "../../resources/data/EditEmployeeData.json";


When("User clicks the edit icon of an existing training record", async function (this: CustomWorld) {
    await this.editEmployeePage.clickEditIcon();
});

When("User updates the trainee training details", async function (this: CustomWorld) {
    await this.editEmployeePage.updateTrainingDetails( editData.course, editData.trainerName);
});

When("User clicks the Update button", async function (this: CustomWorld) {

    await this.editEmployeePage.clickUpdateButton();

});

Then("Training record should be updated successfully", async function (this: CustomWorld) {
    await this.editEmployeePage.verifyUpdatedCourse(editData.course);
});