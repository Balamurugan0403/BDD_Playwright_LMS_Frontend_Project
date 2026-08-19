import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";


When("user clicks the delete icon for the filtered record", { timeout: 20 * 1000 }, async function (this: CustomWorld) {
    await this.homePage.clickDeleteIcon();
});

Then("the filtered trainee record should be deleted successfully", { timeout: 20 * 1000 }, async function (this: CustomWorld) {
    await this.homePage.verifyRowRemoved();
});
