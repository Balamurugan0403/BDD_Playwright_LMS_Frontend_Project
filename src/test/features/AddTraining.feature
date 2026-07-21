@Samiha
Feature: Samiha_15-07-2026_Adding the trainee training records in the site

    Feature Description:
    As a user, I want to add trainee training details.

    Background:
        Given user is on the homepage of the site

    Scenario Outline: Adding employee training data
        And user clicks on the add icon
        And user enters the data "<type>"
        When user clicks on the add button
        Then user should be able to see the record created in the list

        Examples:
            | type               |
            | valid1             |
            | valid2             |
            | empty_empid        |
            | end_before_start   |
            | invalid_percentage |