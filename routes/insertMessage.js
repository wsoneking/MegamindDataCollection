
var mongo = require('./dbConnect.js');

module.exports.insertMessage = function(collection, message, callback){
    mongo.getDB(function(e,db){
                if(e){
                    console.log(e);
                    callback(e,null);
                } else {
                    db.collection(collection, function(err, collection){
                                  if(err){
                                  console.log(err);
                                  callback(err,null);
                                  } else{
                                  collection.insert( { date: new Date(), message: message}, {safe: true}, function(error,result){
                                  if(error){
                                  console.log(error);
                                  callback(error,null);
                                  }else{
                                  console.log("add message to database on "+ new Date());
                                  callback(null, result);
                                  }
                                  });
                                  }
                                  });
                }
                });
}