class ProductListing {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    const limitedList = [list[0], list[1], list[3], list[5]]; // Get the 0th, 1st, 3rd, and 6th products
    this.renderList(limitedList);
  }

  renderList(products) {
    const productHTMLStrings = products.map(productCardTemplate);
    this.listElement.innerHTML = productHTMLStrings.join('');
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default ProductListing;
