Feature: Product Overview

    Scenario: Navigation to product detail
      Given the product overview is displayed
      When I click on a product card
      Then I am navigated to the product detail page. 

    Scenario: Search for a product by name
      Given the product overview is displayed
      When I search for a product by name
      Then only products matching the search term are displayed

    Scenario: Navigate between pages of products
      Given the product overview is displayed
      When I navigate to the next page
      Then the next set of products is displayed