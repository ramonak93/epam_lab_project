Feature: User profile

  Background:
    Given the user is signed in
    And the user is on the profile page

  Scenario: User views their profile information
    When the user views the profile
    Then the user's saved personal information is displayed


  Scenario: User successfully changes their password
    When the user changes the password with valid information
    Then the user is notified that the password has been changed
    And the new password is required for future sign in

  Scenario: User cannot change password with an incorrect current password
    When the user attempts to change the password with an incorrect current password
    Then the user is notified that the current password is incorrect
    And the password remains unchanged