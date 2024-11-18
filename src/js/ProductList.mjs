import { renderListWithTemplate } from './utils.mjs';

// Template to create a product card
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || '0.00'}</p>
      </a>
    </li>`;
}

// ProductList Class
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category; // Category for filtering or identifying
    this.dataSource = dataSource; // Data source for fetching products
    this.listElement = listElement; // DOM element to render the product list
  }

  async init() {
    try {
      // Fetch product data
      const list = await this.dataSource.getData();
      if (list.length === 0) {
        this.renderError('No products available in this category.');
      } else {
        // Render the product list
        this.renderList(list);
      }
    } catch (error) {
      console.error('Error initializing product list:', error);
      this.renderError('Failed to load products. Please try again later.');
    }
  }

  // Render the list of products
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  // Render an error message
  renderError(message) {
    this.listElement.innerHTML = `<p class="error-message">${message}</p>`;
  }
}

/*
Error Handling:
Added try-catch in init to handle potential errors during data fetching or rendering.
Introduced a renderError method to show user-friendly messages when something goes wrong.

Data Validation:
Used optional chaining (?.) and fallback values (||) to handle cases where properties like Brand.Name or FinalPrice might be missing.

Improved Readability:
Clearer variable and method names.
Added comments to explain the purpose of each method and property.

Price Formatting:
Ensured FinalPrice is always displayed with two decimal places using .toFixed(2), even if it’s missing or zero.

Reusable Error Rendering:
Added a renderError method for displaying messages when the list is empty or an error occurs, improving code reusability.

Modularity:
Ensured the class is self-contained and reusable across different categories or data sources.
*/