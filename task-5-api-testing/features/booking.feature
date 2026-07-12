Feature: Booking API

    Scenario: Generate an authentication token
        When valid credentials are submitted
        Then the response status should be success
        And an authentication token is returned

    Scenario: Successfully create a booking
        Given a valid booking request
        When the booking is created
        Then the response status should be success
        And a booking identifier is returned

    Scenario: Successfully update an existing booking with valid authentication
        Given an existing booking
        And valid authentication token is available
        When the booking is updated 
        Then the response status should be success
        And the updated booking details are returned

    Scenario: Fail to update an existing booking without valid authentication
        Given an existing booking
        And valid authentication token is not available
        When the booking is updated 
        Then the response status should be client error
        And an error message is returned

    Scenario: Delete an existing booking with valid authentication
        Given an existing booking
        And valid authentication token is available
        When the booking is deleted by an authenticated user
        Then the response status should be success
        And the booking can no longer be retrieved
        
        