import renderLengthCart from './cart';
import productList from './productList.mjs';
import { loadHeaderFooter } from './utils.mjs'

renderLengthCart('.length-cart');
productList('.product-list', 'tents');
loadHeaderFooter();
/* 
function renderSuperscriptNumberCart(){
    const lengthRenderCart = document.querySelector('.length-cart');
    console.log(getLenghtCart());
    lengthRenderCart.innerHTML = getLenghtCart();
}
renderSuperscriptNumberCart(); */