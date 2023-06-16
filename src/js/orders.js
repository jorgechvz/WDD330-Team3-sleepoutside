import { checkLogin } from './auth.mjs';
import { getCurrentOrders } from './currentOrders.mjs';
import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();


const token = checkLogin();
console.log(token);


getCurrentOrders('#orders', token);

