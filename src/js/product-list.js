import { getParam } from './utils.mjs';
import productList from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const category = getParam('category');
productList('.product-list', category);
loadHeaderFooter();
