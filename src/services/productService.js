//const baseUrl = process.env.REACT_APP_API_BASE_URL
const baseUrl =
  "https://biztrips-project-6jtfgnudb-phillipsmachs-projects.vercel.app/";
export async function getProducts(category) {
  const response = await fetch(baseUrl + "" + category, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (response.ok) return response.json();
  throw response;
}

export async function getProduct(category, id) {
  const response = await fetch(baseUrl + category + "/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  if (response.ok) return response.json();
  throw response;
}
export async function postProduct(category, product) {
  const response = await fetch(baseUrl + category, {
    headers: {
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
    method: "DELETE",
  });
  if (response.ok) return response.json();
  throw response;
}
