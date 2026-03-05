const { I } = inject();
let createdProduct;

Given('I send a GET request to {string}', async (endpoint: string) => {
  await I.sendRequestToEndpoint(endpoint);
});

Given('I send a POST request to {string}', async (endpoint: string, table) => {
  const productData = table.parse().hashes()[0];

  productData.price = Number(productData.price); // Convert price to number

  createdProduct = productData;

  await I.createProduct(endpoint, productData);
});

When('I send a PUT request to {string} with data', async (endpoint: string, table) => {
  const updateData = table.parse().hashes()[0];

  await I.updateProduct(endpoint, updateData);
});

Then('the response status should be {int}', (expectedStatus: number) => {
  I.assertResponseStatus(expectedStatus);
});

Then('I print titles of products with odd IDs', () => {
  I.printTitlesWithOddIds();
});

Then('the response should contain correct product data', () => {
  I.assertResponseContainsProductData(createdProduct);
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


