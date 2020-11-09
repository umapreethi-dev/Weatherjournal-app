// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require("express");
//var path = require('path');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
const { request } = require("http");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Initialize all route with a callback function
app.get("/all", sendData);

// Callback function to complete GET '/all'
function sendData(request, response) {
  ///response.sendFile(path.join(__dirname + '/index.html'));
  response.send(projectData);
}

// Post Route
const data = [];
app.post("/add", callBack);

function callBack(req, res) {
  projectData["date"] = req.body.date;
  projectData["icon"] = req.body.icon;
  projectData["city"] = req.body.city;
  projectData["temp"] = req.body.temp;
  projectData["feelings"] = req.body.feelings;
  console.log(projectData);
  res.send(projectData);
}

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
function listening() {
  console.log(`running in the localhost: ${port}`);
}
