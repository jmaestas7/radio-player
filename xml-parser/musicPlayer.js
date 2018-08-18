const musicData = require(__dirname + "\\musicData.json");
const express = require('express')
const app = express()

var trackCount = Object.keys(musicData.Tracks).length

function shuffle(){
    return Math.floor(Math.random() * trackCount + 1);  
}

function getTrackLocation(trackID) {
    return musicData.Tracks[trackID].Location;
}

console.log(getTrackLocation(shuffle()));