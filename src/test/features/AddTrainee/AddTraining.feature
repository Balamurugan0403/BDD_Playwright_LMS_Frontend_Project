@Samiha
Feature: Add Employee Training Record

  Background:
    Given User launches the application
    And User navigates to the Employee Training page

  Scenario: Verify user can add a new employee training record successfully

    When User clicks on the Add icon
    And User enters trainee details from "validTrainee"
    And User clicks on the Add button
    Then User should see the employee "Henry" in the employee training list