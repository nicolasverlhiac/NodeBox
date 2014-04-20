var express = require('express');
var fs = require('fs');
var multipart = require('connect-multiparty');
var db = require('./db');

db.init('log.json');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(multipart(
    {keepExtensions: true, uploadDir: __dirname+"/public/uploads"}
    ));

app.use(express.static(__dirname + "/public"));

app.get('/', function(req,res){
    res.render("page",{db:db.tout()});
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
    res.redirect("/");
});

app.get('/telecharger', function(req, res){

        var file = __dirname + "/public" + req.query.index;
        res.download(file);
});


app.get('/log.json', function(req, res){
 var file = __dirname + '/log.json';
 res.download(file);
});

app.get('/delete', function(req,res){
  var element = db.chercher(req.query.index);
  if (element){
    fs.unlink(element.path,
      function(){
        db.effacer(req.query.index);
      });
  };
  res.redirect("/");
});


app.get('/refresh', function(req,res){
  
  var spawn = require('child_process').spawn;
  var url = require('url');
  var url_filename = "http://" + ipUser_1 + ":3333/log.json";
  // var url_filename = "log.json";
  //On extrait le nom du fichier de l'url :
  var file_name = url.parse(url_filename).pathname.split('/').pop();
  //On crée une instance du flux en écriture :
  var file = fs.createWriteStream ('./' + file_name);
  //On exécute CURL avec la fonction spawn :
  var curl = spawn('curl', [url_filename]);
  curl.stdout.on('data', function(data) { file.write(data); });
  //On ajoute un listener d'événement "end" pour détecter la fin du téléchargement. A ce moment là, on ferme le fichier :
  curl.stdout.on('end', function(data) {
      file.end();
  });
  //Vous pouvez ajouter un listener d'événement "exit" si vous en avez besoin. Il vous permettra d'être informé quand le process spawn est terminé :
  curl.on('exit', function(code) {
      if (code != 0) {
          // Problème rencontré
      }
  });
  

  res.redirect("/");

});


app.listen(3333);


// Adresse IP des utilisateurs
//----------------------------

// Ludovic
var ipUser_1 = "132.213.164.13";
// Amine
var ipUser_2 = "132.213.160.89";
// Nicolas
var ipUser_3 = "132.213.164.166";