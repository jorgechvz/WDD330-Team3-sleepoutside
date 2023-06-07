import { getLocalStorage, renderListWithTemplate } from './utils.mjs';

export default function shoppingCart() {
  const cartItems = getLocalStorage('so-cart');
  const selectorCart = document.querySelector('.product-list');
  renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);
  renderTotalCart(cartItems);
  selectorCart.addEventListener('click', deleteProduct);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="deleteBtn" data-id="${item.Id}"><span class="xBtn">x</span></button>
</li>`;
  return newItem;
}

function renderTotalCart(itemPrices) {
  let totalPrice = 0;
  itemPrices.forEach((item) => {
    totalPrice += item.FinalPrice;
  })
  const getTotalPrice = document.querySelector('.cart-total');
  const hideDisplay = document.querySelector('.hide');
  if (itemPrices.length != 0) {
    hideDisplay.style.display = 'block';
  }
  return getTotalPrice.innerHTML = `Total: $ ${totalPrice}`
}

function deleteProduct(event) {
  // Find the delete button that was clicked
  const deleteButton = event.target.closest('.deleteBtn');

  // Check if a delete button was found
  if (deleteButton) {
    // Retrieve the product id from the data-id attribute of the delete button
    const productId = deleteButton.dataset.id;

    // Get the current cart items from local storage
    let cartItems = getLocalStorage('so-cart');

    // Find the index of the product with the matching id
    const index = cartItems.findIndex(item => item.Id === productId);

    // Check if the product was found in the cart
    if (index !== -1) {
      // Remove the product from the cartItems array
      cartItems.splice(index, 1);

      // Save the updated cartItems back to local storage
      localStorage.setItem('so-cart', JSON.stringify(cartItems));

      // Re-render the cart list with the updated cartItems
      const selectorCart = document.querySelector('.product-list');
      renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);

      // Update the total cart price
      renderTotalCart(cartItems);
    }
  }
}








