var express = require('express');
var app = express();
var id3 = require('id3js');
var fs = require('fs');
var async = require('async');
var songFolderPath = process.env.HOME+"/projects/protify-songs";
var pg = require('pg');
var conString = "postgres://@localhost/database";

var params = { host: "localhost", user: "lallinuo", password: "e1312e9207f01e4d", database: "lallinuo", ssl: true};

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


//Palauttaa JSONina kaikkien biisien pathit ja niihin liittyvät tagit
app.get('/tracks', function(req, res){
  //käy läpi biisit halutusta kansiosta ja luo jokaisesta oman olion talettaen pathiin kappaleen polun
  fs.readdir(songFolderPath,function(err,files){
    var songs = files.map(function(x){
      return {path: songFolderPath+"/"+x};
    });
    //käy kaikkien biisien pathit läpi, ja lisää niihin tagsit id3 kirjaston avulla
    //async map, koska id3 on asynkroninen
    async.map(songs,function(file,callback){
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

