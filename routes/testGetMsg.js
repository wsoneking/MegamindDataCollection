
var getMsg = require('./getMessage.js');


var coll = 'testCollection4';


getMsg.getMessage(coll, function(e,docs){
                  if(e){
                  console.log("docs return as null. \n"+e);
                  process.exit(1);
                  
                  } else {
                  
                  console.log("docs is not null \n");
                  console.log(docs);
                  
                  docs.forEach(function(doc,index,array){
                               console.log("doc is: " + JSON.stringify(doc));
                               });
                  process.exit(0);
                  }
                  
                  });