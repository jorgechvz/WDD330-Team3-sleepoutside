import { findProductById, getProductsByCategory, searchProduct } from './externalServices.mjs';
import { addProductToCart, errOutcome } from './productDetails.mjs';
import { getParam, renderListWithTemplate } from './utils.mjs';
import { checkLogin } from './auth.mjs';


const sliderInput = document.querySelector('#sliderInput');
const sliderValue = document.querySelector('#sliderValue');
let products = [];

sliderInput.value = 10;
sliderInput.max = 200;
sliderValue.textContent = `$${sliderInput.value}`;

export default function productList(selector, category) {
  const container = document.querySelector(selector);
  getProductsByCategory(category)
    .then((fetchedProducts) => {
      products = fetchedProducts;
      renderProductList(container);
      eventModal();
    })
    .catch((error) => console.error(error));
}

export function productListBySearch(selector) {
  const token = checkLogin();
  searchProduct(token)
    .then((fetchedProducts) => {
      products = fetchedProducts;
      filterBySearchName(selector);
    })
    .catch((error) => console.error(error));
}

function renderProductList(container) {
  const minPrice = parseInt(sliderInput.value, 10);
  const filteredProducts = products.filter((product) => product.FinalPrice >= minPrice);
  filteredProducts.reverse(); // Reverse the order of the filtered products
  renderListWithTemplate(productCardTemplate, container, filteredProducts, minPrice, 'afterbegin', true);
}
sliderInput.addEventListener('input', () => {
  sliderValue.textContent = `$${sliderInput.value}`;
  const container = document.querySelector('.product-list');
  renderProductList(container);
});

// Call productList function to initiate rendering
productList('.product-list', 'category'); // Replace 'category' with your desired category


function productCardTemplate(product) {
  const getDiscountPercent = 100 - ((product.FinalPrice * 100) / product.SuggestedRetailPrice).toFixed(0);
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img class="product__image" src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
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
  findProductById(idProduct)
    .then((products) => {
      renderModal(products);
      document.querySelector('#addToCart').addEventListener('click', () => {
        addProductToCart(products);
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
      getProductByIdForModal(productId);
      getModal.style.display = 'block';
    });
  });
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      getModal.style.display = 'none';
    });
  }
  window.addEventListener('click', (event) => {
    if (event.target === getModal) {
      getModal.style.display = 'none';
    }
  });
}

function renderModal(product) {
  const getDiscountPercent = 100 - ((product.FinalPrice * 100) / product.SuggestedRetailPrice).toFixed(0);
  const getModal = document.querySelector('#myModal');
  getModal.innerHTML = `
    <div class="modal-content">
      <header class="modal-header">
        <h2>${product.Name}</h2>
        <span class="close-modal">&times;</span>
      </header>
      <hr>
      <section class="modal-section discount-container">
        <ul class="modal-product">
          <li class="title-product-modal">${product.NameWithoutBrand}</li>
          <p class="dis-indicator"><span>- ${getDiscountPercent}%</span></p>
          <li class="title-product-modal modal-price">$${product.FinalPrice}</li>
          <li class="color-product-modal">Color: ${product.Colors[0].ColorName}</li>
          <li class="description-product-modal">${product.DescriptionHtmlSimple}</li>
          <div class="product-detail__add modal-addToCart">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
          </div>
        </ul>
        <img src="${product.Images.PrimaryLarge}" alt="Image Of ${product.Name}" />
      </section>
    </div>
  `;
}

export function capitalizeWord(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterBySearchName(selector, products) {
  const getSearchForm = document.querySelector('#search-form');
  const container = document.querySelector(selector);
  if (getSearchForm) {
    getSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const getSearchValue = document.querySelector('#search-input').value.trim();
      if (getSearchValue) {
        const filteredResults = products.filter((product) => {
          const productName = product.Name;
          return productName.includes(getSearchValue);
        });
        if (filteredResults.length === 0) {
          renderEmptySearch();
        } else {
          renderListWithTemplate(productCardTemplate, container, filteredResults);
          eventModal();
        }
      } else {
        renderListWithTemplate(productCardTemplate, container, products);
        eventModal();
      }
    });
  }
}

function renderEmptySearch() {
  const container = document.querySelector('.product-list');
  container.innerHTML = `<h2>Product not found</h2>`;
}