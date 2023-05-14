import { getParam } from './utils.mjs';
import productDetails from "./productDetails.mjs";

const idProduct = getParam('product');
productDetails(idProduct);

// remove item from cart
// document.querySelector('deleteBtn').addEventListener('click', () => {
//   console.log('button clicked');
// })
