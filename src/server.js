import dbjson from "../db.json"
import { deleteProduct, getProduct, getProducts, patchProduct, postProduct } from "./services/productService";
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(dbjson);
const middlewares = jsonServer.defaults(postProduct,getProducts,getProduct,patchProduct,deleteProduct);

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
