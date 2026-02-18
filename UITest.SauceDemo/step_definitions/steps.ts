const { I } = inject();
import assert from 'assert';

Given('I am logged in as a "standard_user"', () => {
  I.loginAsStandardUser();
});

Given('I am logged in as a "problem_user"', () => {
  I.loginAsProblemUser();
});

Given('I provide credentials for a "locked_out_user"', () => {
  I.provideCredentialsForLockedOutUser();
});

When('I add all items to the cart', () => {
  I.addAllItemsToCart();
});

When('I go to the cart', () => {
  I.goToTheCart();
});

When('I remove third item from the cart', () => {
  I.removeThirdItemFromCart();
});

When('I proceed to checkout overview', () => {
  I.proceedToCheckoutOverview();
});

When('I finish the purchase', () => {
  I.finishPurchase();
});

When('I open the item one product page', () => {
  I.openItemOneProductPage();
});

When('I add the item to the cart', () => {
  I.addTheItemToTheCart();
});

When('I sort products by name from A to Z', () => {
  I.sortItemsFromAtoZ();
});

When('I attempt to log in', () => {
  I.attemptToLogIn();
});

Then('I should see only the items selected for purchase', () => {
  I.shouldSeeOnlyRemainingItems();
});

Then('The total count of items in the overview should be {int}', (count: number) => {
  I.seeNumberOfVisibleElements('.cart_item', count);
});

Then('Website should show me the confirmation page', () => {
  I.seeConfirmationPage();
});

Then('I should see Sauce Labs Onesie in the cart', () => {
  I.shouldSeeSauceLabsOnesieInTheCart();
});

//async function to check if products are sorted alphabetically
Then('The products should be sorted alphabetically', async () => {
  const productNames = await I.grabTextFromAll('.inventory_item_name');
  const sortedNames = [...productNames].sort((a, b) => a.localeCompare(b));
  assert.deepStrictEqual(productNames, sortedNames, 'Products are not sorted alphabetically');
});

Then('I should see a login error message', () => {
  I.shouldSeeLoginErrorMessage();
}); 