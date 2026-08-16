import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../main/support/CustomWorld";

let selectedFilterValue: string;
let selectedFilter: string;

When(
    'the user click any option from {string} dropdown',
    async function (this: CustomWorld, filter: string) {

        selectedFilterValue = await this.homePage.selectFilterOption(filter);

        selectedFilter = filter;
    }
);

Then(
    'the records with that project name only should be displayed',
    async function (this: CustomWorld) {
        await this.homePage.verifyFilteredRecords(selectedFilter,selectedFilterValue);
    }
);

