import { findProductById } from './productData.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';

let product = {};

export default async function productsDetails(productId) {
  try {
    product = await findProductById(productId);
    renderProductDetails();
    document.querySelector('#addToCart').addEventListener('click', () => {
      addProductToCart(product);
    });
  } catch (error) {
    console.log(error)
    errOutcome();
  }
}

function addProductToCart(product1) {
  // Retrieve the current cart items from local storage
  const cartItems = getLocalStorage('so-cart');
  // Check if there are any cart items
  if (cartItems.length) {
    // If there are already cart items, add the new product to the existing list
    cartItems.push(product1);
    // Save the updated cart items to local storage
    setLocalStorage('so-cart', cartItems);
  } else {
    // If there are no existing cart items, create a new array with the product and save it to local storage
    setLocalStorage('so-cart', [product1]);
  }
}

const renderProductDetails = () => {
  const productName = document.querySelector('#productName');
  const productWithBrand = document.querySelector('#productNameWithoutBrand');
  const productImage = document.querySelector('#productImage');
  const productPrice = document.querySelector('.product-card__price');
  const productDiscount = document.querySelector('.product-card__discount');
  const productColor = document.querySelector('.product__color');
  const productDescription = document.querySelector('.product__description');
  const addToCart = document.querySelector('#addToCart');

  productName.innerHTML = product.Name;
  productWithBrand.innerHTML = product.NameWithoutBrand;
  productImage.src = product.Images.PrimaryLarge;
  productDiscount.innerHTML = `Discount: $${Math.round(product.SuggestedRetailPrice - product.FinalPrice)}`;
  productPrice.innerHTML = `Final Price: $${product.FinalPrice}`;
  productColor.innerHTML = `Color: ${product.Colors[0].ColorName}`;
  productDescription.innerHTML = product.DescriptionHtmlSimple;
  addToCart.dataset.id = product.Id;
};

function errOutcome() {
  document.querySelector('#addToCart').classList.toggle('addBtn');
  const productName = document.querySelector('#productNameWithoutBrand');
  const errorMsg = document.createElement('p');
  errorMsg.innerHTML = 'Product not found, Try with other';
  errorMsg.style.textAlign = 'center';
  productName.insertAdjacentElement('afterend', errorMsg);
};