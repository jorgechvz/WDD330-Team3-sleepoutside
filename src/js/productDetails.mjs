import { findProductById } from './productData.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';

let product = {};

export default async function productsDetails(productId) {
  product = await findProductById(productId);
  console.log(product);
  renderProductDetails();
  document.querySelector('#addToCart').addEventListener('click', () => {
    addProductToCart(product);
  });
}

function addProductToCart(product) {
  // Retrieve the current cart items from local storage
  const cartItems = getLocalStorage('so-cart');
  // Check if there are any cart items
  if (cartItems.length) {
    // If there are already cart items, add the new product to the existing list
    cartItems.push(product);
    // Save the updated cart items to local storage
    setLocalStorage('so-cart', cartItems);
  } else {
    // If there are no existing cart items, create a new array with the product and save it to local storage
    setLocalStorage('so-cart', [product]);
  }
}

const renderProductDetails = () => {
  const productName = document.querySelector('#productName');
  const productWithBrand = document.querySelector('#productNameWithoutBrand');
  const productImage = document.querySelector('#productImage');
  const productPrice = document.querySelector('.product-card__price');
  const productColor = document.querySelector('.product__color');
  const productDescription = document.querySelector('.product__description');
  const addToCart = document.querySelector('#addToCart');

  productName.innerHTML = product.Name;
  productWithBrand.innerHTML = product.NameWithoutBrand;
  productImage.src = product.Image;
  productPrice.innerHTML = product.FinalPrice;
  productColor.innerHTML = product.Colors[0].ColorName;
  productDescription.innerHTML = product.DescriptionHtmlSimple;
  addToCart.dataset.id = product.Id;
};
