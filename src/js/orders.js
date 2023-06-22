import { checkLogin } from './auth.mjs';
import { getCurrentOrders } from './currentOrders.mjs';
import { getLocalStorage, loadHeaderFooter, updateCartItemCount } from './utils.mjs';
updateCartItemCount();
loadHeaderFooter();


const token = checkLogin();


getCurrentOrders('#orders', token);

