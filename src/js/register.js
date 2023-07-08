import { register } from './auth.mjs';
import { getLocalStorage, getParam, loadHeaderFooter, updateCartItemCount } from './utils.mjs';
updateCartItemCount();
loadHeaderFooter();

const redirect = getParam('redirect');

document.querySelector('#registerButton').addEventListener('click', (e) => {
    const name = document.querySelector('#name').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    register({ name, lastName, email, password }, redirect);
});