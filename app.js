var express = require('express');
var app = express();
var id3 = require('id3js');
var fs = require('fs');
var async = require('async');
var songFolderPath = process.env.HOME+"/projects/protify-songs";
var pg = require('pg');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var params = { host: "localhost", user: "lallinuo", password: "e1312e9207f01e4d", database: "lallinuo", ssl: true};
//var params = { host: "localhost", user: "postgres", password: "tsoha2014", database: "postgres", ssl: true};

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/tracks/:id',function(req,res){
  pg.connect(params,function(err,client,done){
    client.query('SELECT * FROM Songs WHERE id =$1',[req.params.id],
      function(err, result){
        done();
        if(err || !result.rows.length){
          res.send("Song not found");
          return console.log(err)
        }
        res.send(result.rows[0]);
      })

  })
})

app.get('/tracks',function(req,res){
  pg.connect(params, function(err,client,done){
    if(err){
      return console.log(err);
    }
    client.query('SELECT * FROM Songs', function(err,result){
      done();
      res.send(result.rows);
      console.log(result);
    })
  })

})

//Palauttaa JSONina kaikkien biisien pathit ja niihin liittyvät tagit
app.get('/tracksFromFolder', function(req, res){
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

app.listen(3001, function() {
      console.log("Listening on " + 3001);
});
