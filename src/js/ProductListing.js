import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import {loadHeaderFooter, getParams } from './utils.mjs';

loadHeaderFooter();

const category = getParams('category');
const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const list = new ProductList(category, dataSource, element);

list.init();