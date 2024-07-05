const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getProducts(category) {
  const response = await fetch(baseUrl + "" + category);
  if (response.ok) return response.json();
  throw response;
}

export async function getProduct(category,id) {
  const response = await fetch(baseUrl + category + "/" + id );
  if (response.ok) return response.json();
  throw response;
}
export async function postProduct(category,product) {
  const response = await fetch(baseUrl +  category,{method:"post",body:product});
  if (response.ok) return response.json();
  throw response;
}
export async function patchProduct(category,id,product) {
  console.log(product);
  const response = await fetch(baseUrl + category + "/" + id,{method:"PATCH",body:product});
  if (response.ok) return response.json();
  throw response;
}
export async function deleteProduct(category,id) {
  const response = await fetch(baseUrl +  category + "/" + id,{method:"delete"});
  if (response.ok) return response.json();
  throw response;
}
