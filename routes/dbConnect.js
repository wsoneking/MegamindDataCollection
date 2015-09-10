var mongodb = require('mongodb');
var server = new mongodb.Server('megamind.cc', 27017, { auto_reconnect : true });
var database = new mongodb.Db('admin', server, { safe : true });
var db = null;


module.exports.getDB = function(callback) {
    if(!db){
        database.open(function(err,dbConnection) {
            database.authenticate('bo','ilovegod000', function(error, result){
                                  if(!err && !error){
                                    db = dbConnection;
                                    callback(null,db);
                                  } else {
                                    if(err) callback(err, null);
                                    else callback(error, null);
                                  }
                                  });
            
        });
//        console.log("close the db.");
//        database.close();
//        console.log("closed the db.");
    } else
        callback(null, db);
    
};