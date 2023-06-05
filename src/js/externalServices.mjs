const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
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
  return await fetch(`${baseURL}checkout`, options).then(convertToJson);
}