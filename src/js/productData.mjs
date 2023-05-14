function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export function getData(category="tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  try {
    const products = await getData(); // I think the mistake is here by repeating the procces
    return products.find((item) => item.Id === id);
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}
