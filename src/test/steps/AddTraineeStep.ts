import { Given, When, Then } from "@cucumber/cucumber";
import traineeData from "../../resources/data/trainee.json";
import { CustomWorld } from "../../main/support/CustomWorld";

Given("User launches the application", async function (this: CustomWorld) {
    await this.addTraineePage.launchApplication();
});

Given("User navigates to the Employee Training page", async function (this: CustomWorld) {
    
    await this.addTraineePage.navigateToEmployeeTrainingPage();
});

When("User clicks on the Add icon", async function (this: CustomWorld) {
    await this.addTraineePage.clickAddIcon();
});

When(
    "User enters trainee details from {string}",
    async function (this: CustomWorld, dataKey: string) {
        const data = traineeData[dataKey as keyof typeof traineeData];
        await this.addTraineePage.enterTraineeDetails(data);
    }
);

When("User clicks on the Add button", async function (this: CustomWorld) {
    await this.addTraineePage.clickAddButton();
});

Then(
    "User should see the employee {string} in the employee training list",
    async function (this: CustomWorld, employeeName: string) {
        await this.addTraineePage.verifyEmployeeAdded(employeeName);
    }
);