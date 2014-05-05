var express = require('express');
var app = express();
var id3 = require('id3js');
var fs = require('fs');

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/tracks', function(req, res){

  //id3({ file: './DucK_Classicalised-Dub-160.mp3', type: id3.OPEN_LOCAL }, function(err, tags) {
    //  res.send(tags);
  //});

  res.send("Hello CORS")
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
      console.log("Listening on " + port);
});

