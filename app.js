var express = require('express');
var fs = require('fs');
var multipart = require('connect-multiparty');
var db = require('./db');

db.init('photos_db.json');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(multipart(
    {keepExtensions: true, uploadDir: __dirname+"/public/uploads"}
    ));

app.use(express.static(__dirname + "/public"));

app.get('/', function(req,res){
    res.render("page",{});
});

app.get('/post', function(req,res){
    res.render("post",{});
});

app.post('/add', function(req,res){
    var path = req.files.fichier.path;
    var key = path.match(/[-.a-z0-9]*$/ig)[0];
    db.ajouter(key, { nom: req.body.nom,
                      url: "/uploads/"+key,
                      path: req.files.fichier.path });
    res.redirect("/photos#"+key);
});

app.get('/photos', function(req,res){
        res.render("photos", {db:db.tout()});
});

app.get('/delete', function(req,res){
  var element = db.chercher(req.query.index);
  if (element){
    fs.unlink(element.path,
      function(){
        db.effacer(req.query.index);
      });
  };
  res.redirect("/photos");
});

app.listen(3333);


// Adresse IP des utilisateurs
//----------------------------

// Ludovic
var ipUser_1 = 132.213.164.13;
// Amine
var ipUser_2 = 132.213.160.89;
// Nicolas
var ipUser_3 = 132.213.164.166;