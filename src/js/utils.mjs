// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  // Retrieve the data stored in local storage for the specified key
  const data = JSON.parse(localStorage.getItem(key));
  // If data was successfully retrieved from local storage
  if (data) {
    // Check if the retrieved data is an array
    // If it is, return it as is
    // If it is not, wrap it in an array and return it
    return Array.isArray(data) ? data : [data];
  } else {
    // If no data was retrieved, log an error message and return an empty array
    return [];
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export const getParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(''));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");
  console.log(headerTemplateFn)
  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const element = document.querySelector('.products')
  const alertMessage = document.createElement('div');
  // add a class to style the alert
  alertMessage.classList.add('alert')
  // set the contents. You should have a message and an X or something the user can click on to remove
  alertMessage.innerHTML = `<p>${message}</p><span>X</span>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alertMessage.addEventListener('click', function (e) {
    if (e.target.tagName == "SPAN") { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      element.removeChild(this);
    }
  })
  element.insertAdjacentHTML('afterbegin', alertMessage)
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll)
    window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  setTimeout(function () {
    element.removeChild(alert);
  }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector(".products").removeChild(alert));
}