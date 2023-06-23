import { getProductsByCategory } from './externalServices.mjs';
import { addProductToCart } from './productDetails.mjs';
import { getParam, renderListWithTemplate } from './utils.mjs';

export default function productList(selector, category) {
  const container = document.querySelector(selector);
  getProductsByCategory(category)
    .then((products) => {
      console.log(products);
      renderListWithTemplate(productCardTemplate, container, products);
      eventModal();
    })
    .catch((error) => console.error(error));
}

function productCardTemplate(product) {
  const getDiscountPercent =
    100 - ((product.FinalPrice * 100) / product.SuggestedRetailPrice).toFixed(0);
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img class="product__image"
          src="${product.Images.PrimaryMedium}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <div class="product-header-info">
          <p class="product-card__price">$${product.FinalPrice}</p>
          <p class="discount-indicator"><span>- ${getDiscountPercent}%</span></p>
        </div>
        <p class="product-card__suggest">$${product.SuggestedRetailPrice}</p>
        </a>
        <button type="button" class="open-modal" data-id="${product.Id}" data-open="modal1">Quick lookup</button>
    </li>
    `;
}

function getProductByIdForModal(idProduct) {
  const category = getParam('category');
  getProductsByCategory(category)
    .then((products) => {
      const foundProduct = products.find((item) => item.Id == idProduct);
      renderModal(foundProduct);
      document.querySelector('#addToCart').addEventListener('click', () => {
        addProductToCart(foundProduct);
      });
      eventModal();
    })
    .catch((error) => console.error(error));
}

function eventModal() {
  const getModalOpen = document.querySelectorAll('.open-modal');
  const getModal = document.querySelector('#myModal');
  const closeModal = getModal.querySelector('.close-modal');
  getModalOpen.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = e.target.dataset.id;
      console.log(productId, 'ID');
      getProductByIdForModal(productId);
      getModal.style.display = 'block';
    });
  });
  if(closeModal){
    closeModal.addEventListener('click', () => {
      getModal.style.display = 'none';
    });
  }
  window.addEventListener('click', (event) => {
    if (event.target == getModal) {
      getModal.style.display = 'none';
    }
  });
 
}

function renderModal(product) {
  const getModal = document.querySelector('#myModal');
  getModal.innerHTML = `
    <div class="modal-content">
      <header class="modal-header">
        <h2>${product.Name}</h2>
        <span class="close-modal">&times;</span>
      </header>
      <hr>
      <section class="modal-section">
        <ul class="modal-product"> 
          <li class="title-product-modal">${product.NameWithoutBrand}</li>
          <li class="title-product-modal modal-price">$${product.FinalPrice}</li>
          <li class="color-product-modal">Color: ${product.Colors[0].ColorName}</li>
          <li class="description-product-modal">${product.DescriptionHtmlSimple}</li>
          <div class="product-detail__add modal-addToCart">
              <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
          </div>
        </ul>
        <img src="${product.Images.PrimaryLarge}" alt="Image Of ${product.Name}"/>
      </section>
    </div>
  `;
}

export function capitalizeWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
