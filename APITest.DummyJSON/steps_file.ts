import assert from 'assert';

export = function () {

  let lastResponse: { status: number; data: any };
  let fetchedData: any;
  let updatedData: any;
  let responseTime: number;

  return actor({

    /**
 * Sends HTTP request to given endpoint using native fetch.
 *
 * Why fetch instead of CodeceptJS REST helper?
 * ------------------------------------------------
 * In this specific scenario I needed:
 * - direct access to raw response data
 * - manual response time measurement
 * - explicit control over stored response values
 *
 * Although this introduces some duplication (base URL hardcoded),
 * it keeps the request/response handling fully transparent and easy to debug
 * within the scope of this recruitment task.
 *
 * In a production-ready framework this would be refactored into:
 * - centralized API client
 * - configurable base URL
 * - reusable request abstraction
 */
    async sendRequestToEndpoint(endpoint: string) {
      // Measure request duration manually
      const start = Date.now();

      // Direct fetch call (base URL hardcoded intentionally for simplicity)
      const response = await fetch(`https://dummyjson.com${endpoint}`);
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

    /**
 * Creates a new product using direct HTTP POST request.
 *
 * Why native fetch instead of CodeceptJS REST helper?
 * ----------------------------------------------------
 * For this recruitment task I decided to:
 * - keep request logic explicit and transparent
 * - manually control request payload and response handling
 * - store response data in a shared object for later assertions
 *
 * In a production-ready test framework this would typically be:
 * - moved to a centralized API client layer
 * - use configurable base URL
 * - reuse common request wrapper to avoid duplication
 */
    async createProduct(product: {
      title: string;
      description: string;
      price: number;
      brand: string;
    }) {
      // Send POST request to create a new product
      const response = await fetch('https://dummyjson.com/products/add', {
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

    /**
    * Updates an existing product using HTTP PUT request.
    *
    * This method intentionally:
    * - uses native fetch for explicit control over request structure
    * - defines update payload locally for scenario clarity
    * - stores updated response separately for comparison with previously fetched data
    *
    * For a production-grade solution this would likely:
    * - accept dynamic update payload as parameter
    * - reuse a centralized API client
    * - use configurable base URL instead of hardcoded value
    */

    async updateProduct(id: number) {
      // Define update payload used in this scenario
      const updates = { title: 'Updated Product Title', description: 'Updated Description' };

      // Send PUT request to update product by id
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
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
