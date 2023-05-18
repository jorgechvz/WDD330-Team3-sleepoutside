import { getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default function shoppingCart() {
  const cartItems = getLocalStorage('so-cart');
  const selectorCart = document.querySelector('.product-list');
  renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="deleteBtn" data-id="${item.Id}"><span>x</span></button>
</li>`;
  return newItem;
}

/* function getLenghtCart() {
    const getCartItems = getLocalStorage('so-cart');
    const lengthCart = getCartItems.length;
    return lengthCart;
  } 
  export default function renderLengthCart(selector) {
    const lengthCart = document.querySelector(selector);
    lengthCart.innerHTML = getLenghtCart();
  }
  renderLengthCart('.length-cart'); 
  
*/
function deleteItem() {
  const deleteBtn = document.querySelector('.deleteBtn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteFunctionality);
  }
}

deleteItem();

function deleteFunctionality() {
  let dataID = this.getAttribute('data-id');
  const cartItems = getLocalStorage('so-cart');
  console.log(cartItems);
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id == dataID) {
      cartItems.splice(i, 1);
      localStorage.removeItem(i);
      localStorage.setItem('so-cart', JSON.stringify(cartItems));
    }
    shoppingCart();
    return;
  }
}
