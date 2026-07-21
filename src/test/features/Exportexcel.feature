@Balamurugan
Feature: Balamurugan_20-07-2026_Export the trainee training records

    Feature Description:
    As a user,
    I want to export trainee training details.

    Background:
        Given user is on the homepage of the site

    Scenario: Export trainee training details

        When User clicks the Export to Excel button
        Then Excel file should be downloaded successfully