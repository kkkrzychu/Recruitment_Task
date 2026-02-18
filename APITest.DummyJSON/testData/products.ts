/**
 * Test data for Products API scenarios.
 *
 * This file centralizes commonly used product objects for reuse across multiple tests.
 * By keeping product definitions in a separate module, we:
 * - avoid duplication of test data
 * - make test steps more readable and concise
 * - allow easy modification of test data without touching feature steps
 */
export const newProduct = {
  title: 'Test Product',
  description: 'Test Description',
  price: 999,
  brand: 'Test Brand'
};