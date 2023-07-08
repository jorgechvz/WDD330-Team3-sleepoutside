import { getLocalStorage, renderListWithTemplate, setLocalStorage, updateCartItemCount } from './utils.mjs';

export default function wishlist() {
    const cartItems = getLocalStorage('wish-list');
    const selectorCart = document.querySelector('.wish-list');
    const addCartBtn = document.querySelector('.addCart-btn');
    if (cartItems.length == 0) {
        displayCheckout(cartItems);
    } else {
        displayCheckout(cartItems);
        renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);
        renderTotalCart(cartItems);
        selectorCart.addEventListener('click', deleteProduct);
        selectorCart.addEventListener('click', addToCart);
        addCartBtn.addEventListener('click', alltoCart);
        selectorCart.addEventListener('change', updateQuantity);
    }
}

function alltoCart() {
    // Get the current cart items from local storage
    let cartItems = getLocalStorage('wish-list');

    // Check if the wish-list has any items
    if (cartItems.length > 0) {
        // Get the existing cart items from local storage
        let cart = getLocalStorage('so-cart');

        // Check if there are existing cart items
        if (cart) {
            // Add the products from the wish-list to the existing cart items
            cart.push(...cartItems);
        } else {
            // Create a new cart with the products from the wish-list
            cart = [...cartItems];
        }

        // Save the updated cart items to local storage
        setLocalStorage('so-cart', cart);

        // Clear the wish-list by setting it to an empty array
        cartItems = [];

        // Save the updated wish-list back to local storage
        setLocalStorage('wish-list', cartItems);

        // Re-render the cart list with the updated cartItems
        const selectorCart = document.querySelector('.wish-list');
        renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);

        // Update the total cart price
        renderTotalCart(cart);
        updateCartItemCount();
    }
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
  <picture>
    <source
      media="(max-width: 200px)"
      srcset="${item.Images.PrimarySmall}"
    />
    <source
      media="(max-width: 320px)"
      srcset="${item.Images.PrimaryMedium}"
    />
    <source
      media="(max-width: 800px)"
      srcset="${item.Images.PrimaryLarge}"
    />
    <source
      media="(max-width: 2100px)"
      srcset="${item.Images.PrimaryExtraLarge}"
    />
    <img
      class="product__image"
      src="${item.Images.ExtraImages && item.Images.ExtraImages[0].Src}"
      alt="Image of ${item.Name}"
      loading="lazy"
    />
  </picture>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <input type="number" min="1" value="${item.Quantity
        }" class="quantity-input" data-id="${item.Id}"/></p>
  <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
  <button class="deleteBtn" style="grid-row:2/3;" data-id="${item.Id
        }"><span class="xBtn"><img src="../../images/trash.svg" alt="Icon Trash"/></span></button>
        <button class="deleteBtn-wish" data-id="${item.Id
        }"><span class="xBtn"><img src="../../images/logos/cart-icon.png" alt="Icon Cart"/></span></button>
</li>`;
    return newItem;
}

function renderTotalCart(itemPrices) {
    let totalPrice = 0;
    itemPrices.forEach((item) => {
        totalPrice += item.FinalPrice * item.Quantity;
    });
    const getTotalPrice = document.querySelector('.wish-total');
    const hideDisplay = document.querySelector('.hide-wish');
    if (itemPrices.length != 0) {
        hideDisplay.style.display = 'flex';
        displayCheckout(itemPrices);
    } else {
        displayCheckout(itemPrices);
        hideDisplay.style.display = 'none';
    }
    return (getTotalPrice.innerHTML = `Total: $ ${totalPrice.toFixed(2)}`);
}

function addToCart(event) {
    // Find the delete button that was clicked
    const deleteButton = event.target.closest('.deleteBtn-wish');

    // Check if a delete button was found
    if (deleteButton) {
        // Retrieve the product id from the data-id attribute of the delete button
        const productId = deleteButton.dataset.id;

        // Get the current cart items from local storage
        let cartItems = getLocalStorage('wish-list');

        // Find the index of the product with the matching id
        const index = cartItems.findIndex((item) => item.Id === productId);

        // Check if the product was found in the cart
        if (index !== -1) {
            // Get the product to be added to the cart
            const product = cartItems[index];

            // Get the existing cart items from local storage
            let cart = getLocalStorage('so-cart');

            // Check if there are existing cart items
            if (cart) {
                // Add the product to the existing cart items
                cart.push(product);
            } else {
                // Create a new cart with the product
                cart = [product];
            }

            // Save the updated cart items to local storage
            setLocalStorage('so-cart', cart);

            // Remove the product from the cartItems array
            cartItems.splice(index, 1);

            // Save the updated cartItems back to local storage
            setLocalStorage('wish-list', cartItems);


            // Re-render the cart list with the updated cartItems
            const selectorCart = document.querySelector('.wish-list');
            renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);

            // Update the total cart price
            renderTotalCart(cartItems);
            updateCartItemCount();
        }
    }
}

function deleteProduct(event) {
    // Find the delete button that was clicked
    const deleteButton = event.target.closest('.deleteBtn');

    // Check if a delete button was found
    if (deleteButton) {
        // Retrieve the product id from the data-id attribute of the delete button
        const productId = deleteButton.dataset.id;

        // Get the current cart items from local storage
        let cartItems = getLocalStorage('wish-list');

        // Find the index of the product with the matching id
        const index = cartItems.findIndex((item) => item.Id === productId);

        // Check if the product was found in the cart
        if (index !== -1) {
            // Remove the product from the cartItems array
            cartItems.splice(index, 1);

            // Save the updated cartItems back to local storage
            setLocalStorage('wish-list', cartItems);

            // Re-render the cart list with the updated cartItems
            const selectorCart = document.querySelector('.wish-list');
            renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);

            // Update the total cart price
            renderTotalCart(cartItems);
            updateCartItemCount();
        }
    }
}

function updateQuantity(event) {
    const quantityInput = event.target;
    const productId = quantityInput.dataset.id;
    const newQuantity = parseInt(quantityInput.value);

    let cartItems = getLocalStorage('wish-list');
    const index = cartItems.findIndex((item) => item.Id === productId);

    if (index !== -1) {
        cartItems[index].Quantity = newQuantity;
        setLocalStorage('wish-list', cartItems);
        const selectorCart = document.querySelector('.wish-list');
        renderListWithTemplate(cartItemTemplate, selectorCart, cartItems);
        renderTotalCart(cartItems);
        updateCartItemCount();
    }
}

function messageEmpty() {
    const selectorCart = document.querySelector('.wishes');
    let messageCartEmpty = document.createElement('div');
    messageCartEmpty.className = 'message_empty';
    messageCartEmpty.innerHTML = `
    <h3>You Wish List is Empty</h3>
    <p>Please add products!!</p>
    <img class="empty_cart" src="../../images/carro.png" alt="Shopping cart Empty Image">
  `;
    selectorCart.appendChild(messageCartEmpty);
}

function displayCheckout(items) {
    const checkoutShow = document.querySelector('.addCart-btn button');
    if (items != 0) {
        checkoutShow.style.display = 'block';
    } else {
        checkoutShow.style.display = 'none';
        messageEmpty();
    }

}
