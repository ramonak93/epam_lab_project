@product_overview
Feature: Product Overview

    @navigation
    Scenario: Navigation to product detail
      Given the product overview is displayed
      When I click on a product card
      Then I am navigated to the product detail page. 

    @search
    Scenario: Search for a product by name
      Given the product overview is displayed
      When I search for a product by name
      Then only products matching the search term are displayed

    @pagination
    Scenario: Navigate between pages of products
      Given the product overview is displayed
      When I navigate to the next page
      Then the next set of products is displayed