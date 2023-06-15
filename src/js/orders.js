import { checkLogin } from './auth.mjs';
import { getCurrentOrders } from './currentOrders.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const token = checkLogin();

getCurrentOrders('#orders', token);

