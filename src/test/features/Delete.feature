@sowndariya
Feature: Sowndariya_20-07-2026_Delete the trainee training record from the site

  Background:
    Given user is on the homepage of the site

  Scenario Outline: Delete a trainee record and verify it is removed

    When user clicks on the delete icon for trainee "<empId>"
    And user confirms the delete action
    Then the trainee "<empId>" should be deleted successfully

    Examples:
      | empId  |
      | EMP001 |
      | EMP002 |
