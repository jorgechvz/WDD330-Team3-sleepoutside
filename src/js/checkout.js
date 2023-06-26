import { loadHeaderFooter, updateCartItemCount } from './utils.mjs';
import checkoutProcess from './checkoutProcess.mjs';
updateCartItemCount();
loadHeaderFooter();

checkoutProcess.init('so-cart', '.order-summary');

document
  .querySelector('#zip')
  .addEventListener('blur', checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.checkout(e.target);
});
