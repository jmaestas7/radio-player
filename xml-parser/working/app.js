#!/usr/bin/env nodejs

// Dependencies
// ===========================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Data
// ===========================================================
var tracks = require(__dirname + "\\public\\json\\musicData.json");

// Routes
// ===========================================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view\\index.html"));
});

//Serve static content for the app from the "public" directory in the application directory.

  // GET /style.css etc
  app.use(express.static('public'));

// Mount the middleware at "/static" to serve static content only when their request path is prefixed with "/static".

  // GET /static/style.css etc.
  // app.use('/static', express.static(__dirname + '/public'));
  
// Question mark signifies that the parameter is "optional".
app.get("/api/:Tracks?", function(req, res) {
  // Grab the selected parameter
  var chosen = req.params.tracks;

  // If a parameter is provided...
  if (chosen) {
    console.log(chosen);

    // Filter to show only the selected character
    for (var i = 0; i < tracks.length; i++) {
      if (chosen === tracks[i].routeName) {
        return res.json(tracks[i]);
      }
    }

    // Otherwise display "No character found"
    return res.send("No character found");
  }

  // If no parameter is provided display all the characters
  return res.json(tracks);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});