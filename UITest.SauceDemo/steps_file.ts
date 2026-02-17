import { log } from "node:console";

export = function () {
  return actor({
    loginAsStandardUser() {
      this.amOnPage('/');
      this.fillField('#user-name', 'standard_user');
      this.fillField('#password', 'secret_sauce');
      this.click('#login-button');
    },

    loginAsProblemUser() {
      this.amOnPage('/');
      this.fillField('#user-name', 'problem_user');
      this.fillField('#password', 'secret_sauce');
      this.click('#login-button');
    },

    addAllItemsToCart() {
      this.click('#add-to-cart-sauce-labs-backpack');
      this.click('#add-to-cart-sauce-labs-bike-light');
      this.click('#add-to-cart-sauce-labs-bolt-t-shirt');
      this.click('#add-to-cart-sauce-labs-fleece-jacket');
      this.click('#add-to-cart-sauce-labs-onesie');
      this.click("button[id='add-to-cart-test.allthethings()-t-shirt-(red)']");
    },

    goToTheCart() {
      this.click('.shopping_cart_link');
    },

    removeThirdItemFromCart() {
      this.click('#remove-sauce-labs-bolt-t-shirt');
    },

    shouldSeeOnlyRemainingItems() {
      this.dontSee('Sauce Labs Bolt T-Shirt');
      this.see('Sauce Labs Backpack');
      this.see('Sauce Labs Bike Light');
      this.see('Sauce Labs Fleece Jacket');
      this.see('Sauce Labs Onesie');
      this.see('Test.allTheThings() T-Shirt (Red)');
    },

    proceedToCheckoutOverview() {
      this.click('#checkout');
      this.fillField('#first-name', 'Nikodem');
      this.fillField('#last-name', 'Chlebowski');
      this.fillField('#postal-code', '12345');
      this.click('#continue');
    },

    seeConfirmationPage() {
      this.see('Thank you for your order');
    },

    finishPurchase() {
      this.click('#finish');
    },

    openItemOneProductPage() {
      this.click('a[id="item_1_title_link"]');
    },

    addTheItemToTheCart() {
      this.click('#add-to-cart');
    },

    shouldSeeSauceLabsOnesieInTheCart() {
      this.see('Sauce Labs Onesie');
    },

    sortItemsFromAtoZ() {
      this.click('.product_sort_container');
      this.selectOption('.product_sort_container', 'az');
    },

    provideCredentialsForLockedOutUser() {
      this.amOnPage('/');
      this.fillField('#user-name', 'locked_out_user');
      this.fillField('#password', 'secret_sauce');
    },
    attemptToLogIn() {
      this.click('#login-button');
    },
    shouldSeeLoginErrorMessage() {
      this.see('Epic sadface: Sorry, this user has been locked out.');
    }
  }
  );
};
