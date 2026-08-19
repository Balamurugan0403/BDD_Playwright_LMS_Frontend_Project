@Rohini
Feature: Rohini_15-07-2026_Edit the trainee training records in the site

    Feature Description:
    As a user,
    I want to edit trainee training details.

    Background:
        Given user is on the homepage of the site

    Scenario: Edit all fields of an existing trainee training record
        When User clicks the edit icon of an existing training record
        And User updates all field of trainee training details
        And User clicks the Update button
        Then All trainee training details should be updated successfully

    Scenario: Edit specific fields of an existing trainee training record
        When User clicks the edit icon of an existing training record
        And User updates the specific field of trainee training details
        And User clicks the Update button
        Then Training record should be updated successfully

    