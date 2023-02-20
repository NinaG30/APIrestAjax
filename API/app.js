const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const FF8Route = require("./src/routes/FF8_route");
const FF10Route = require("./src/routes/FF10_route");
app.use(FF8Route);
app.use(FF10Route);

// Route d'essai de l'app
// Ex: http://localhost:3001
app.get("/", (request, response) => {
    console.log("ça fonctionne");
  });

  module.exports = app;