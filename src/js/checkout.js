import { loadHeaderFooter, updateCartItemCount } from './utils.mjs';
import checkoutProcess from './checkoutProcess.mjs';
updateCartItemCount();
loadHeaderFooter();

checkoutProcess.init('so-cart', '.order-summary');

document
  .querySelector('#zip')
  .addEventListener('blur', checkoutProcess.calculateOrderTotal.bind(checkoutProcess));

document.querySelector('.checkout-orden')
  .addEventListener('click', (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
      checkoutProcess.checkout();
    }
  });

