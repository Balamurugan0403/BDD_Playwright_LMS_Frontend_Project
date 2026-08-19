import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../main/support/CustomWorld";

let downloadedFile: any;

When("User clicks the Export to Excel button", async function (this: CustomWorld) {
    downloadedFile = await this.homePage.exportEmployeeDetails();
});

Then("Excel file should be downloaded successfully", async function () {
    expect(downloadedFile).toBeTruthy();
    const fileName = await downloadedFile.suggestedFilename();
    console.log("Downloaded File:", fileName);
    expect(fileName.endsWith(".xlsx")).toBeTruthy();
});
