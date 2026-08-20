import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import editData from "../../resources/data/EditEmployeeData.json";


When("User clicks the edit icon of an existing training record", async function (this: CustomWorld) {
    await this.editEmployeePage.clickEditIcon();
});

When("User updates the specific field of trainee training details", async function (this: CustomWorld) {
    await this.editEmployeePage.updateTrainingDetails( editData.specificFields.course, editData.specificFields.trainerName);
});


Then("Training record should be updated successfully", async function (this: CustomWorld) {
    await this.editEmployeePage.verifyUpdatedCourse(editData.specificFields.course);
});

When("User updates all field of trainee training details", async function (this: CustomWorld) {
    console.log("Updating all trainee training details");
    await this.editEmployeePage.updateAllTrainingDetails(editData.allFields.course,editData.allFields.trainerName,editData.allFields.startDate,editData.allFields.endDate,editData.allFields.status,editData.allFields.completed);
});

When("User does not modify any trainee training details", async function (this: CustomWorld) {
    await this.editEmployeePage.storeOriginalTrainingDetails();
});

When("User clicks the Update button", async function (this: CustomWorld) {
    await this.editEmployeePage.clickUpdateButton();
});


Then("All trainee training details should be updated successfully", async function (this: CustomWorld) {
    await this.editEmployeePage.verifyAllUpdatedTrainingDetails(editData.allFields.course,editData.allFields.trainerName,editData.allFields.startDate,editData.allFields.endDate,editData.allFields.status,editData.allFields.completed);
});

Then("Trainee training details should remain unchanged", async function (this: CustomWorld) {
    await this.editEmployeePage.verifyOriginalTrainingDetails();

});