import jwt_decode from 'jwt-decode';
import { loginRequest, registerRequest } from './externalServices.mjs';
import { alertMessage, getLocalStorage, setLocalStorage } from './utils.mjs';

const tokenKey = 'so-token';

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    console.log(token);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}

export async function register(creds, redirect = "/") {
  try {
    const token = await registerRequest(creds);
    console.log(token);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    alertMessage(err.message.message);
  }
}

function isTokenValid(token) {
  if (token && token.length > 0) {
    const decodedToken = jwt_decode(token[0]); // Access the token string using token[0]
    console.log(decodedToken);
    const current_date = new Date();
    if (decodedToken.exp * 1000 < current_date.getTime()) {
      console.log('token expired');
      return false;
    } else {
      console.log('valid token');
      return true;
    }
  } else {
    return false;
  }
}

export function checkLogin() {
  const getToken = getLocalStorage(tokenKey);
  const valid = isTokenValid(getToken);
  if (!valid) {
    localStorage.removeItem(tokenKey);
    const location = window.location;
    console.log(location);
    window.location = `/login/index.html?redirect=${location.pathname}`;
  } else {
    return getToken;
  }
}