@sowndariya
Feature: Sowndariya_20-07-2026_Delete the trainee training record from the site

Background:
    Given user is on the homepage of the site

Scenario Outline: Delete a trainee record and verify it is removed
    Given user filters the trainee "<empId>" with name "<employeeName>" and course "<course>"
    Then user should see the filtered trainee record
    When user clicks the delete icon for the filtered record
    Then the filtered trainee record should be deleted successfully

Examples:
    | empId  | employeeName | course                 |
    | EMP003 | Samiha M     | Cucumber BDD           |
