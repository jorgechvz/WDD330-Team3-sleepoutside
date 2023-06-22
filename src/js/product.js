import { getParam, updateCartItemCount } from './utils.mjs';
import productDetails from './productDetails.mjs';
updateCartItemCount();
const idProduct = getParam('product');
productDetails(idProduct);
