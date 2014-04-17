var fs = require('fs');

var __db = {};
exports.init = function(db_file){
    var file = __dirname + "/" + db_file;
    try {
      __db = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch(err) {
      __db = {};
    };
    setInterval(function(){
        fs.writeFile(file, JSON.stringify(__db, null, 2));
      }, 30*1000);
};

exports.ajouter = function(key, value){
    __db[key] = value;
};

exports.effacer = function(key){
    delete(__db[key]);
};
exports.chercher = function(key){
    return __db[key];
};
exports.tout = function(){ 
    return __db;
};
