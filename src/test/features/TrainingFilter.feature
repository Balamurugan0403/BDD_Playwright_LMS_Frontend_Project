@Vigneshwaran
Feature: VIGNESHWARAN_M_15-07-2026_Filter Trainee Feature

    Background:
        Given user is on the homepage of the site
        And user clicks on the "Add Training" icon
        And user enters the data "valid1"
        When user clicks on the add button
        Then user should be able to see the record created in the list
    
    Scenario: 
        Given user clicks on the "Add Training" icon
        When the user click any option from the project name dropdown
        Then the records with that project name only should be displayed
