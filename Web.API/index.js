const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./app/routes/routes");

const app = express();
const apiPort = process.env.API_PORT | 3000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(apiPort, () => {
  console.log(`API listening on port :${apiPort}`);
});
