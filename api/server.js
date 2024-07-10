const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use("/api/server");
server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
