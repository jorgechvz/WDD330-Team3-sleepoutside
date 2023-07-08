import { findProductById } from './externalServices.mjs';
import { setLocalStorage, getLocalStorage, updateCartItemCount } from './utils.mjs';


let product = {};

export default async function productsDetails(productId) {
  try {
    product = await findProductById(productId);
    renderProductDetails();
    document.querySelector('#addToCart').addEventListener('click', () => {
      addProductToCart(product);
    });
    document.querySelector('#addToWish').addEventListener('click', () => {
      addProductToCart(product, 1);
    });
  } catch (error) {
    console.log(error)
    errOutcome();
  }
}

export function addProductToCart(product, wishlist = 0) {
  if (!wishlist) {
    // Retrieve the current cart items from local storage
    const cartItems = getLocalStorage('so-cart');
    // Check if the product id exists in the cart
    const existingProduct = cartItems.find((item) => item.Id === product.Id);
    // Check if there are any cart items
    if (cartItems.length) {
      if (existingProduct) {
        // If the product already exists in the cart, increment its quantity
        existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
      } else {
        // If there are already cart items, add the new product to the existing list
        product.Quantity = 1;
        cartItems.push(product);
      }
    } else {
      // If there are no existing cart items, create a new array with the product and save it to local storage
      product.Quantity = 1;
      cartItems.push(product);
    }
    // Add the animation cart
    const cartIcon = document.querySelector('.cart');
    cartIcon.classList.add('cart-icon-animation');
    setTimeout(() => {
      cartIcon.classList.remove('cart-icon-animation');
    }, 1000);
    // Save the updated cart items to local storage
    setLocalStorage('so-cart', cartItems);
    updateCartItemCount();
  } else {
    // Retrieve the current cart items from local storage
    const cartItems = getLocalStorage('wish-list');
    // Check if the product id exists in the cart
    const existingProduct = cartItems.find((item) => item.Id === product.Id);
    // Check if there are any cart items
    if (cartItems.length) {
      if (existingProduct) {
        // If the product already exists in the cart, increment its quantity
        existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
      } else {
        // If there are already cart items, add the new product to the existing list
        product.Quantity = 1;
        cartItems.push(product);
      }
    } else {
      // If there are no existing cart items, create a new array with the product and save it to local storage
      product.Quantity = 1;
      cartItems.push(product);
    }
    // Add the animation cart
    const cartIcon = document.querySelector('.wish');
    cartIcon.classList.add('wish-icon-animation');
    setTimeout(() => {
      cartIcon.classList.remove('wish-icon-animation');
    }, 1000);
    // Save the updated cart items to local storage
    setLocalStorage('wish-list', cartItems);
    updateCartItemCount();
  }

}



const renderProductDetails = () => {
  const getDiscountPercent =
    100 - ((product.FinalPrice * 100) / product.SuggestedRetailPrice).toFixed(0);
  const productName = document.querySelector('#productName');
  const productWithBrand = document.querySelector('#productNameWithoutBrand');
  const productImage = document.querySelector('#productImage');
  const productPrice = document.querySelector('.product-card__price');
  const indicatorDiscount = document.querySelector('.discount-indicator span');
  const productDiscount = document.querySelector('.product-card__discount');
  const productColor = document.querySelector('.product__color');
  const productDescription = document.querySelector('.product__description');
  const addToCart = document.querySelector('#addToCart');

  productName.innerHTML = product.Name;
  productWithBrand.innerHTML = product.NameWithoutBrand;
  productImage.innerHTML = `
  <source
    media="(max-width: 150px)"
    srcset="${product.Images.PrimarySmall}"
  />
  <source
    media="(max-width: 320px)"
    srcset="${product.Images.PrimaryMedium}"
  />
  <source
    media="(max-width: 800px)"
    srcset="${product.Images.PrimaryLarge}"
  />
  <source
    media="(max-width: 2100px)"
    srcset="${product.Images.PrimaryExtraLarge}"
  />
  <img
    class="product__image"
    src="${product.Images.ExtraImages && product.Images.ExtraImages[0].Src}"
    alt="Image of ${product.Name}"
    loading="lazy"
  />`
  // productImage.src = product.Images.PrimaryLarge;
  // productImage.alt = `Image of ${product.Name}`;
  productDiscount.innerHTML = `Discount: $${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)}`;
  indicatorDiscount.innerHTML = `-${getDiscountPercent}%`;
  productPrice.innerHTML = `Final Price: $${product.FinalPrice}`;
  productColor.innerHTML = `Color: ${product.Colors[0].ColorName}`;
  productDescription.innerHTML = product.DescriptionHtmlSimple;
  addToCart.dataset.id = product.Id;
};

export function errOutcome() {
  document.querySelector('#addToCart').classList.toggle('addBtn');
  const productName = document.querySelector('#productNameWithoutBrand');
  const errorMsg = document.createElement('p');
  errorMsg.innerHTML = 'Product not found, Try with other';
  errorMsg.style.textAlign = 'center';
  productName.insertAdjacentElement('afterend', errorMsg);
};