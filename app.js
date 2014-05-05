var express = require('express');
var app = express();

app.get('/', function(req, res){
  var test = {track: "Love Generation", artist: "Bob Sinclar", time: "3:30", album: "Love Generation"}
  res.send(test);
});
var port = Number(process.env.PORT || 5000);

