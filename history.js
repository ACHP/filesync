'use strict';
module.exports = {



  createInsert : function(file){

    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    db.serialize(function() {

      db.run("CREATE TABLE if not exists fileHistory (name TEXT, content TEXT, time TEXT)");
      var stmt = db.prepare("INSERT INTO fileHistory VALUES (?,?,?)");

          stmt.run({1:file["0"], 2:file["2"], 3:file["1"]});

      stmt.finalize();

    });

    db.close();
  },
  readFile : function(filename, callback){
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');

    db.all("SELECT rowid AS id, name, content, time FROM fileHistory where name ='"+filename+"'",function(err,rows){
      //console.log(rows);
      callback(rows);
    });
    db.close();

  }
}
