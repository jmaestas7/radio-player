// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Music(DATA)
// =============================================================
const musicData = require(__dirname + "\\musicData.json");

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.get("/add", function(req, res) {
//   res.sendFile(path.join(__dirname, "add.html"));
// });

// Get all characters
app.get("/all", function(req, res) {
  res.json(musicData);
});

function shuffle(){
    return Math.floor(Math.random() * trackCount + 1);  
}

function getTrackLocation(trackID) {
    return musicData.Tracks[trackID].Location;
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
