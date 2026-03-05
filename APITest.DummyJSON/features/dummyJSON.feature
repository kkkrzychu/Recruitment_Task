Feature: Products API
  This feature validates the core functionality of the Products API, including:
  - retrieving all products and filtering by ID,
  - creating new products with required fields,
  - updating existing products and validating changes,
  - measuring response times for requests with optional delay parameter.

  Scenario: Get all products and print titles with odd IDs
    Given I send a GET request to "/products"
    Then the response status should be 200
    And I print titles of products with odd IDs

  Scenario: Create new product    
    Given I send a POST request to "/products/add"
    Then the response status should be 201
    And the response should contain correct product data

  Scenario: Get and update third product
    Given I send a GET request to "/products/3"
    When I send a PUT request to "/products/3"
    Then the response status should be 200
    And the product should be updated with new title and description

  Scenario Outline: Get products with delay parameter
    Given I send a GET request to "/products?delay=<delay>"
    Then the response status should be 200
    And the response time should be less than 1000 milliseconds

    Examples:
      | delay |
      | 0     |
      | 5000  |
      | 6000  |
