var express = require('express');
var app = express();
var id3 = require('id3js');
var fs = require('fs');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.allowedDomains);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.configure(function() {
	app.use(allowCrossDomain);
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

