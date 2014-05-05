var express = require('express');
var app = express();
var id3 = require('id3js');
var fs = require('fs');
var async = require('async');
var songdir = process.env.HOME+"/projects/protify-songs";

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/tracks', function(req, res){
  var filesWithPrefix;
  var mp3Infos = [];

  fs.readdir(songdir,function(err,files){
    filesWithPrefix= files.map(function(x){
      return {path: songdir+"/"+x};
    });

    async.map(filesWithPrefix,function(file,callback){
      id3({ file: file.path, type: id3.OPEN_LOCAL }, function(err, tags) {
        file.tags = tags;
        callback(err,file);
      });
    },function(err,files){
      res.send(files);
    });
  });
});
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
      console.log("Listening on " + port);
});

