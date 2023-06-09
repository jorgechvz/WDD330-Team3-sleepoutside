const baseURL = import.meta.env.VITE_SERVER_URL
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}
export function getProductsByCategory(category) {
  return fetch(`${baseURL}products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function findProductById(id) {
  return fetch(`${baseURL}product/${id}`)
    .then(convertToJson)
    .then((data) => data.Result);
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
}