const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getProducts(category) {
  const response = await fetch(baseUrl + "" + category);
  if (response.ok) return response.json();
  throw response;
}

export async function getProduct(id) {
  const response = await fetch(baseUrl + `products/${id}` );
  if (response.ok) return response.json();
  throw response;
}
export async function postProduct(product) {
  const response = await fetch(baseUrl + "products/",{method:"post",body:product});
  if (response.ok) return response.json();
  throw response;
}
export async function putProduct(id,product) {
  const response = await fetch(baseUrl + "products/" + id,{method:"put",body:product});
  if (response.ok) return response.json();
  throw response;
}
export async function deleteProduct(id) {
  const response = await fetch(baseUrl + "products/" + id,{method:"delete"});
  if (response.ok) return response.json();
  throw response;
}
