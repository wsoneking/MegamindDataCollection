var express = require('express');
var router = express.Router();

var insertMsg = require('./insertMessage.js');
var getMsg = require('./getMessage.js');
var removeMsg = require('./removeAllMessage.js');
var removeOneItem = require('./removeOneItem.js');
var coll = 'testCollection4';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Megamind test Node site' });
});

router.get('/helloworld', function(req,res) {
  res.render('helloworld', {title: 'Hello, World!'})
});

/* GET Userlist page. */
router.get('/userlist', function(req,res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{}, function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

router.get('/messagelist', function(req,res) {
	getMsg.getMessage(coll, function(e,docs){
                  if(e){
                  console.log("docs return as null. \n"+e);
                  } else {
                  
                  console.log("docs is not null \n");
                  console.log(docs);
		  var msgs = docs;
		  
                  res.render('listofuser', {
		 	"messages" : msgs
		  }); 
                  }
                  
                  });	

});





router.get('/newuser', function(req,res){
  res.render('newuser',{title: 'Add new user'});
});

router.get('/newmessage', function(req,res){
  res.render('newmessage',{title: 'Add new message'});
});

// post to add user service
router.post('/adduser', function(req,res) {
  
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function(err, doc) {
    if(err) {
      // if it fails, return error
      res.send("There was a problem adding the information to the database.");
    }
    else{
      // if it worked, set the header so the address bar doesn't still say /adduser
      res.location('userlist');
      // And forward to success page
      res.redirect("userlist");
    }
  });
});

// post to add user service
router.post('/addmessage', function(req,res) {
            
            // Set our internal DB variable
            var db = req.db;
            
            // Get our form values. These rely on the "name" attributes
            var msg = req.body.message;
        
            
            // Submit to DB
            insertMsg.insertMessage(coll,msg,function(error,result){
                        if(error){
                                    console.log(error);
                                    res.send("There was a problem adding the information to the database.");
                        } else {
                                    
                                    console.log(result);
                                    // if it worked, set the header so the address bar doesn't still say /adduser
                                    res.location('messagelist');
                                    // And forward to success page
                                    res.redirect("messagelist");
                        }
                    });
            
});


// remove all messages
router.get('/removeallmessage', function(req,res) {
		
	removeMsg.removeAllMessage(coll,function(error, result){
		if(error){
			console.log(error);
		} else {
			console.log(result);
			res.location('messagelist');
			res.redirect('messagelist');
		}
	});
});


// remove one item

router.get('/remove/:msg', function(req,res) {
	removeOneItem.removeOneItem(coll, req.params.msg, function( error, result) {
		if(error) {
			console.log(error);
		} else {
			console.log(result);
			res.location('../messagelist');
			res.redirect('/messagelist');
		}
	});
});







module.exports = router;
