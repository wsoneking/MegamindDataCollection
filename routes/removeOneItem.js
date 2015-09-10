
var mongo = require('./dbConnect.js');

module.exports.removeOneItem = function(coll, msg, callback){
	mongo.getDB(function(e,db){
		if(e){
			console.log(e);
			callback(e,null);
		} else {
			db.collection(coll, function(err, collection) { 
				if(err){
					console.log(err);
					callback(err,null);
				} else {
					collection.remove({message: msg}, {w:1}, function(error, numberofremoveDocs) {
						callback(null, numberofremoveDocs);
						});
				}
			});
		}
	});
}

