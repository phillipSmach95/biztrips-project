import { create, router as _router, defaults } from "json-server";
const cors = require("cors");
const server = create();
const router = _router("db.json");
const middlewares = defaults();
server.use(cors);
server.use(middlewares);
server.use(router);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("JSON Server is running on port", port);
});
