import { Given, When, Then } from "@cucumber/cucumber";
import path, { basename } from "path";

import { CustomWorld } from "../../main/support/CustomWorld";
import { CSVReader } from "../../main/utils/CSVReader";

const csvPath = path.resolve(__dirname,"../../resources/data/AddTrainee.csv");
const trainingData = CSVReader.getData<any>(csvPath);

let selectedData: any;

Given("user is on the homepage of the site",async function (this: CustomWorld) {
        await this.addTraineePage.navigate();
    }
);

Given("user clicks on the add icon",async function (this: CustomWorld) {
        await this.addTraineePage.clickaddbtn();

    }
);

Given("user enters the data {string}",async function (this: CustomWorld, type: string) {
        const data = trainingData.find(
            (item: any) => item.testType === type);

        if (!data) {
            throw new Error(`No test data found for ${type}`);
        }

        selectedData = data;

        await this.addTraineePage.enterEmployeeData(
            data.empId,
            data.projectName,
            data.employeeName,
            data.course,
            data.trainerName,
            data.trainingType,
            data.startDate,
            data.endDate,
            data.status,
            data.percentageCompleted
        );

    }
);

When("user clicks on the add button",async function (this: CustomWorld) {
        await this.addTraineePage.clickaddbtn();

    }
);

Then("user should be able to see the record created in the list",async function (this: CustomWorld) {
        await this.addTraineePage.checkadded(selectedData.empId);

    }
);

Given('user clicks on the {string} icon', async function (this: CustomWorld, s: string) {
    await this.homePage.clickSidebarOption(s);
})
