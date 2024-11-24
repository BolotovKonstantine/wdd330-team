import { setLocalStorage, getLocalStorage, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

//console.log(dataSource.findProductById(productId));

function addProductToCart(cartProduct) {
	let cartItems = getLocalStorage('so-cart');

	if (!cartItems) {
		cartItems = [];
	} else if (!Array.isArray(cartItems)) {
		// Handle case where previous item was stored as a single object
		cartItems = [cartItems];
	}

	cartItems.push(cartProduct);
	setLocalStorage('so-cart', cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
	const selectedProduct = await dataSource.findProductById(e.target.dataset.id); // Renombrado
	addProductToCart(selectedProduct);
}

// add listener to Add to Cart button
document
	.getElementById('addToCart')
	.addEventListener('click', addToCartHandler);
