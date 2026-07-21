@sowndariya
Feature: Sowndariya_20-07-2026_Delete the trainee training record from the site

Background:
    Given user is on the homepage of the site

Scenario Outline: Delete a trainee record and verify it is removed
Given user searches for the trainee "<empId>" in the filter
Then user should see the trainee "<empId>" in the filtered list
When user clicks on the delete icon for trainee "<empId>"
And user confirms the delete action
Then the trainee "<empId>" should be deleted successfully
When user searches again for the trainee "<empId>" in the filter
Then the trainee "<empId>" should not be shown in the list

Examples:
    | empId  |
    | EMP001 |
    | EMP002 |
