import { getLocalStorage } from './utils.mjs';
import { checkout } from "./externalServices.mjs";

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const listPackageItems = items.map((element) => {
    return {
        id: element.id,
        name: element.name,
        price: element.FinalPrice,
        quantity: 1
    }
  })
  return listPackageItems;
}
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
const checkoutProcess = {
  key: '',
  selector: '',
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: (key, selector) => {
    this.key = key;
    this.selector = selector;
    list = getLocalStorage(key);
    this.displayOrderSummary();
  },
  calculateSummary: () => {
    this.list.map((items) => {
      itemTotal += items.FinalPrice;
    });
    tax = (this.itemTotal * 0.6).toFixed(2);
    shipping = this.list.length * 2 + 10 - 2;
  },
  calculateOrderTotal: () => {
    orderTotal = (this.itemTotal + this.tax + this.shipping).toFixed(2);
    this.displayOrderSummary();
  },
  displayOrderSummary: () => {
    selector.innerHtml = `
        <div class="camp-order-summary">
            <p>Item Subtotal(${this.list.length})</p>
            <p>$${this.itemTotal}</p>
        </div>
        <div class="camp-order-summary">
            <p>Shipping Estimate</p>
            <p>$${this.shipping}</p>
        </div>
        <div class="camp-order-summary">
            <p>Tax</p>
            <p>$${this.tax}</p>
        </div>
        <div class="camp-order-summary">
            <p><strong>Order Total</strong></p>
            <p>$${this.orderTotal}</p>
        </div>
    `;
  },
  checkout: async (form) => {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    // call the checkout method in our externalServices module and send it our data object.
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },
};

export default checkoutProcess;

