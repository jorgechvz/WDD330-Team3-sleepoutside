import { getParam, updateCartItemCount } from './utils.mjs';
import productList, { capitalizeWord } from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs';

updateCartItemCount();
const category = getParam('category');
productList('.product-list', category);
loadHeaderFooter();

const categoryName = document.querySelector('.category-name');
categoryName.innerHTML = capitalizeWord(category);
