var fs = require('fs');
var request = require('request');

var r = request.post('http://localhost:3333/add',function(err, res, body){
    var fileNameOnTheServer = body.match(/[-.a-z0-9]*$/ig)[0];
    console.log(" 1. Nom de fichier sur le serveur : "+fileNameOnTheServer);
    console.log(" 2. On va le re-télécherger dans 'COPIE.JPG'.");
    request("http://localhost:3333/uploads/"+fileNameOnTheServer).
        pipe(fs.createWriteStream("COPIE.JPG").on('finish',function(){
	    console.log("Bien, on a fini!");}))
});

var form = r.form();
form.append("nom","Fichier JPEG");
form.append("fichier",fs.createReadStream("fleurs.jpg"));
