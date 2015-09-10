
var insertMsg = require('./insertMessage.js');

var collection = "testCollection4";
var message = "new Message";

//function final() { console.log('Done', results); }



insertMsg.insertMessage(collection,message,function(error,result){
                   if(error){
                                      console.log(error);
                        process.exit(1);
                   } else {
                        
                                      console.log(result);
                        process.exit(0);
                   }
});