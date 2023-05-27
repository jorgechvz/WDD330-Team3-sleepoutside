const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}
export function getData(category) {
  return fetch(`${baseURL}products/search/${category}`)
    .then(convertToJson)
    .then((data) => data.Result);
  console.log(data.Result);
}

export async function findProductById(id) {
  return fetch(`${baseURL}product/${id}`)
    .then(convertToJson)
    .then((data) => data.Result);
    console.log(data.Result);
}
