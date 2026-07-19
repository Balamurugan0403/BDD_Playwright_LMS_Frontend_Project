@Rohini
Feature: Rohini_15JUL2026_EditTrainee
    As a user, I want to edit trainee training details.

Background:
    Given user is on the Employee training records page

Scenario: Edit all employee training details successfully
    When User clicks the edit icon of an existing training record
    And User updates all editable fields with valid data
    And User clicks the Update button
    Then Employee Training record should be updated successfully