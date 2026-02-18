const { I } = inject();
import { newProduct } from '../testData/products';

Given('I send a GET request to {string}', async (endpoint: string) => {
  await I.sendRequestToEndpoint(endpoint);
});

Given('I create a new product', async () => {
  await I.createProduct(newProduct);
});

When('I update the product with id {int} with new title and description', async (id: number) => {
  await I.updateProduct(id);
});

Then('the response status should be {int}', (expectedStatus: number) => {
  I.assertResponseStatus(expectedStatus);
});

Then('I print titles of products with odd IDs', () => {
  I.printTitlesWithOddIds();
});

Then('the response should contain correct product data', () => {
  I.assertResponseContainsProductData(newProduct);
});

Then('the response status should be {int}', (expectedStatus: number) => {
  I.assertResponseStatus(expectedStatus);
})

Then('the product should be updated with new title and description', () => {
  I.validateUpdateProduct();
});

Then('the response time should be less than {int} milliseconds', (maxTime: number) => {
  I.assertResponseTime(maxTime);
});


