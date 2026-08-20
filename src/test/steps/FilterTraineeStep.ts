import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";
import { Employee } from "../../main/types/Employee";

let selectedFilterValue: string;
let selectedFilter: string;

When('the user click any option from {string} dropdown', async function (this: CustomWorld, filter: string) {
        selectedFilterValue = await this.homePage.selectFilterOption(filter);
        selectedFilter = filter;
    }
);

Then('the records with that project name only should be displayed', async function (this: CustomWorld) {
      await this.homePage.verifyFilteredRecords(selectedFilter,selectedFilterValue);
    }
);

Then('the records starting with that data should only be displayed', async function (this: CustomWorld)  {
    await this.homePage.verifyFilteredRecords(selectedFilter,selectedFilterValue);
})

When("the user enters the created user's {string} in {string} field", async function (this: CustomWorld, data: keyof Employee, input: string)  {
    selectedFilter = input;
    selectedFilterValue = this.employee[data];
    await this.homePage.enterTextInFilter(input, selectedFilterValue);  
})



