import assert from 'assert';

export = function () {

  let lastResponse: { status: number; data: any };
  let fetchedData: any;
  let updatedData: any;
  let responseTime: number;

  return actor({
    async sendRequestToEndpoint(endpoint: string) {
      const start = Date.now();

      const response = await fetch(`https://dummyjson.com${endpoint}`);
      const data = await response.json();

      const end = Date.now();
      
      lastResponse = {
        status: response.status,
        data: data
      };
      fetchedData = data;
      responseTime = end - start;
    },

    assertResponseStatus(expectedStatus: number) {
      assert.strictEqual(
        lastResponse.status,
        expectedStatus,
        `Expected status ${expectedStatus} but got ${lastResponse.status}`
      );
    },

    printTitlesWithOddIds() {
      const products = lastResponse.data.products;

      products.forEach((product: any) => {
        if (product.id % 2 !== 0) {
          console.log(`Product ID: ${product.id}, Title: ${product.title}`);
        }
      });
    },

    async createProduct(product: {
      title: string;
      description: string;
      price: number;
      brand: string;
    }) {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      const data = await response.json();

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
/*
    async getTheProductWithID(id: number) {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      fetchedData = data;
    },
    */

    async updateProduct(id: number) {
      const updates = { title: 'Updated Product Title', description: 'Updated Description' };
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      updatedData = data;
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
