const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const server = require("http").createServer(app);

const node_library = require("./library");
const config = require("./config");
const routes = require("./routes");

try {
  app.use(express.json({ limit: "50mb" }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );
  app.use(express.static("public"));
  app.use("/", express.static("public"));

  node_library.map((lib) => require(`./library/${lib}`)(app));
  config.map((conf) => require(`./config/${conf}`));
  const route_arr = routes.map((route) => require(`./routes/${route}`));
  app.use("/", route_arr);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
  module.exports = app;
} catch (error) {
  console.log("error in server:", error.message);
}
