

// Below are the server files
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

// Serve static content for the app from the "public" directory in the app directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Import routes and give server access
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);
app.listen(port);