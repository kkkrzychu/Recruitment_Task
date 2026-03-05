import assert from 'assert';
import * as dotenv from 'dotenv';
dotenv.config();

export = function () {

  let lastResponse: { status: number; data: any };
  let fetchedData: any;
  let updatedData: any;
  let responseTime: number;

  return actor({
    
    async sendRequestToEndpoint(endpoint: string) {
      // Measure request duration manually
      const start = Date.now();

      // Direct fetch call (base URL hardcoded intentionally for simplicity)
      const response = await fetch(`${process.env.BASEURL}${endpoint}`);
      const data = await response.json();

      const end = Date.now();

      // Store response status and body for later assertions
      lastResponse = {
        status: response.status,
        data: data
      };

      // Preserve original fetched data (used in update comparison scenarios)
      fetchedData = data;

      // Calculate total response time in milliseconds
      responseTime = end - start;      
    },

    assertResponseStatus(expectedStatus: number) {
      // Assert that the response status matches the expected value
      assert.strictEqual(
        lastResponse.status,
        expectedStatus,
        `Expected status ${expectedStatus} but got ${lastResponse.status}`
      );
    },

    printTitlesWithOddIds() {
      const products = lastResponse.data.products;

      // Iterate through products and print titles of those with odd IDs
      products.forEach((product: any) => {
        if (product.id % 2 !== 0) {
          console.log(`Product ID: ${product.id}, Title: ${product.title}`);
        }
      });
    },
  
    async createProduct(endpoint: string, product: {
      title: string;
      description: string;
      price: number;
      brand: string;
    }) {
      // Send POST request to create a new product

      console.log(`Creating product with title: ${product.title}`);
      const response = await fetch(`${process.env.BASEURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        // Convert JS object into JSON payload
        body: JSON.stringify(product)
      });

      // Parse response body
      const data = await response.json();

      // Store response for later validation in test steps
      lastResponse = {
        status: response.status,
        data: data
      };
    },

    assertResponseContainsProductData(expected: {
      title: string;
      description: string;
      price: number;
      brand: string;
    }) {
      assert.strictEqual(lastResponse.data.title, expected.title);
      assert.strictEqual(lastResponse.data.description, expected.description);
      assert.strictEqual(lastResponse.data.price, expected.price);
      assert.strictEqual(lastResponse.data.brand, expected.brand);
    },  

    async updateProduct(endpoint: string) {
      // Define update payload used in this scenario
      const updates = { title: 'Updated Product Title', description: 'Updated Description' };

      // Send PUT request to update product by id
      const response = await fetch(`${process.env.BASEURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },

        // Serialize update object into JSON
        body: JSON.stringify(updates)
      });

      // Parse response body
      const data = await response.json();

      // Store updated response separately for comparison logic
      updatedData = data;

      // Store response metadata for status validation
      lastResponse = {
        status: response.status,
        data: data
      };
    },

    validateUpdateProduct() {
      assert.strictEqual(updatedData.price, fetchedData.price, 'Price should not change');
      assert.strictEqual(updatedData.brand, fetchedData.brand, 'Brand should not change');

      assert.notStrictEqual(updatedData.title, fetchedData.title, 'Title should change');
      assert.notStrictEqual(updatedData.description, fetchedData.description, 'Description should change');
    },

    assertResponseTime(maxTime: number) {
      assert.ok(
        responseTime <= maxTime,
        `Expected response time to be less than or equal to ${maxTime}ms, but got ${responseTime}ms`
      );
    }
  });
};
