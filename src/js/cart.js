import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  console.log(cartItems);
  if (cartItems.length) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
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
}

renderCartContents();

// delete item from cart
document.querySelector('.deleteBtn').addEventListener('click', function () {
  let dataID = this.getAttribute('data-id');
  const cartItems = getLocalStorage('so-cart');
  console.log(cartItems);
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id == dataID) {
      cartItems.splice(i, 1);
      localStorage.removeItem(i);
      localStorage.setItem('so-cart', JSON.stringify(cartItems));
    }
    renderCartContents();
    return;
  }
});
