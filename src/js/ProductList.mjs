import renderListWithTemplate from 'utils.mjs';


function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
            <img
              src="${product.Image}"
              alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      }

    async init() {
        // database will return a Promise, await can be used to resolve
        const list = await this.dataSource.getData();
        // limit list to specific products
        const limitedList = [list[0], list[1], list[3], list[5]]; 

        //render the list
        this.renderList(limitedList);
    }

        // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    // }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}
