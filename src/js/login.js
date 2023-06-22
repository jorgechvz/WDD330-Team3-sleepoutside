import { login } from './auth.mjs';
import { getLocalStorage, getParam, loadHeaderFooter, updateCartItemCount } from './utils.mjs';
updateCartItemCount();
loadHeaderFooter();

const redirect = getParam('redirect');

document.querySelector('#loginButton').addEventListener('click', (e) => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login({ email, password }, redirect);
});
