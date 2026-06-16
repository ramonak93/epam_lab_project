Feature: Sign in

  Background:
    Given the user is on the sign in page

  Scenario Outline: User successfully signs in with valid credentials
    Given a registered user with email "<Email>" and password "<Password>"
    When the user signs in
    Then the user is granted access to their account

    Examples:
      | Email                                | Password  |
      | customer@practicesoftwaretesting.com | welcome01 |

  Scenario: Admin successfully signs in with valid credentials
    Given a registered admin user
    When the admin signs in
    Then the admin is granted access to the dashboard

  Scenario Outline: Sign in attempt with missing credentials
    Given the credentials "<Email>" and "<Password>"
    When the user attempts to sign in
    Then the user is notified that the missing fields are required

    Examples:
      | Email                                | Password  |
      |                                      | welcome01 |
      | customer@practicesoftwaretesting.com |           |
      |                                      |           |

  Scenario Outline: Sign in attempt with invalid credentials
    Given the credentials "<Email>" and "<Password>"
    When the user attempts to sign in
    Then the user is notified of invalid credentials

    Examples:
      | Email                                | Password  |
      | unknown@practicesoftwaretesting.com  | welcome01 |
      | customer@practicesoftwaretesting.com | wrongpass |

  Scenario: Account lockout after repeated failed sign in attempts
    Given a registered user
    When the user attempts to sign in with incorrect credentials 3 times
    Then the user's account is locked
    And the user is notified that the account is locked