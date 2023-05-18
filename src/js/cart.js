import { getLocalStorage } from './utils.mjs';
import shoppingCart from './shoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';


shoppingCart();
loadHeaderFooter();


// function getLenghtCart() {
//   const getCartItems = getLocalStorage('so-cart');
//   const lengthCart = getCartItems.length;
//   return lengthCart;
// }
// export default function renderLengthCart(selector) {
//   const lengthCart = document.querySelector(selector);
//   lengthCart.innerHTML = getLenghtCart();
// }
// renderLengthCart('.length-cart');

// // delete item from cart
// function deleteItem() {
//   const deleteBtn = document.querySelector('.deleteBtn');
//   if (deleteBtn) {
//     deleteBtn.addEventListener('click', deleteFunctionality);
//   }
// }

// deleteItem();

// function deleteFunctionality() {
//   let dataID = this.getAttribute('data-id');
//   const cartItems = getLocalStorage('so-cart');
//   console.log(cartItems);
//   for (let i = 0; i < cartItems.length; i++) {
//     if (cartItems[i].Id == dataID) {
//       cartItems.splice(i, 1);
//       localStorage.removeItem(i);
//       localStorage.setItem('so-cart', JSON.stringify(cartItems));
//     }
//     renderCartContents();
//     return;
//   }
// }
