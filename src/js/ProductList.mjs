import {renderListWithTemplate} from './utils.mjs';


function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
            <img
              src="${product.Images.PrimaryMedium}"
              alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
      }

    async init() {
        // database will return a Promise, await can be used to resolve
        this.products = await this.dataSource.getData(this.category);
        // // limit list to specific products
        // const limitedList = [list[0], list[1], list[3], list[5]]; 

        //render the list
        this.renderList(this.products);

        //set the title to the current category
        document.querySelector('.title').innerHTML = this.category;

        // Add sorting functionality
        this.addSortListener();
    }

        // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    // }


    renderList(list) {
        // Clear the existing list to avoid duplication
        this.listElement.innerHTML = '';
        
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }

    addSortListener() {
        const sortDropdown = document.getElementById('sortOptions');
        sortDropdown.addEventListener('change', (event) => {
          const sortCriteria = event.target.value;
          let sortedList;
      
          if (sortCriteria === 'name') {
            sortedList = [...(this.products || [])].sort((a, b) =>
              a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
            );
          } else if (sortCriteria === 'price') {
            sortedList = [...(this.products || [])].sort((a, b) => a.FinalPrice - b.FinalPrice);
          } else {
            sortedList = [...(this.products || [])]; // Default: unsorted
          }
      
          // Render the sorted list
          this.renderList(sortedList);
        });
    
}
}
