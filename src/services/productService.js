// const baseUrl = process.env.REACT_APP_API_BASE_URL
const baseUrl = "https://biztrips-project.vercel.app/";
export async function getProducts(category) {
  const response = await fetch(baseUrl + category, {
    headers: {
      "Access-Control-Allow-Credentials":"true",
    },
    method: "GET",
  });
  console.log(response);
  console.log("status Text: "+response.statusText)
  if (response.ok) return response.json();
  console.log("not Okey response"+ response);
  throw response;
}

export async function getProduct(category, id) {
  const response = await fetch(baseUrl + category + "/" + id, {
    headers: {
      "Access-Control-Allow-Credentials":"true",
    },
    method: "GET",
  });
  if (response.ok) return response.json();
  throw response;
}
export async function postProduct(category, product) {
  const response = await fetch(baseUrl + category, {
    headers: {
      "Access-Control-Allow-Credentials":"true",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(product),
  });
  if (response.ok) return response.json();
  throw response;
}
export async function patchProduct(category, id, product) {
  console.log(product);
  const response = await fetch(baseUrl + category + "/" + id, {
    headers: {
      "Access-Control-Allow-Credentials":"true",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(product),
  });
  if (response.ok) return response.json();
  throw response;
}
export async function deleteProduct(category, id) {
  const response = await fetch(baseUrl + category + "/" + id, {
    "Access-Control-Allow-Credentials":"true",
    "Content-Type": "application/json",
    method: "DELETE",
  });
  if (response.ok) return response.json();
  throw response;
}
