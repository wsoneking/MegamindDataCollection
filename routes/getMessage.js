var mongo = require('./dbConnect.js');

module.exports.getMessage = function(coll, callback){
    mongo.getDB(function(e,db){
                if(e){
                console.log(e);
                callback(e,null);
                } else {
                db.collection(coll, function(err, collection){
                              if(err){
                              console.log(err);
                              callback(err,null);
                              } else {
                              collection.find().toArray(function(error,docs){
                                                        if(error ){
                                                        console.log(error);
                                                        callback(error,null);
                                                        } else {
                                                        callback(null,docs);
                                                        }
                                                        });
                              }
                              });
                }
                });
}