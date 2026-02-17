Feature: SauceDemo store functionality
  In order to use the store correctly
  As a user
  I want to be able to log in, add items to the cart, sort products, and handle errors

  Scenario: Standard user removes the third item before checkout and completes purchase
    Given I am logged in as a "standard_user"
    When I add all items to the cart
    And I go to the cart
    And I remove third item from the cart
    And I proceed to checkout overview
    Then I should see only the items selected for purchase
    And The total count of items in the overview should be 5
    When I finish the purchase
    Then Website should show me the confirmation page

  Scenario: Problem user adds one item to the cart and validates
    Given I am logged in as a "problem_user"
    When I open the item one product page
    And I add the item to the cart
    And I go to the cart
    Then I should see Sauce Labs Onesie in the cart
  
Scenario: Standard user sorts products by name
    Given I am logged in as a "standard_user"
    When I sort products by name from A to Z
    Then The products should be sorted alphabetically

 Scenario: Locked out user fails to log in
    Given I provide credentials for a "locked_out_user"
    When I attempt to log in
    Then I should see a login error message