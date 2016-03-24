var Client = require('../models/client');
var bcrypt = require('bcrypt-nodejs');

function createHash(data, callback) {
  
  console.log("hashing the data: "+data);
  
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    
    bcrypt.hash(data, salt, null, callback);
  });
};

exports.addClient = function(req, res) {
  var client = new Client();
  
    client.name = req.body.name;
    createHash(req.body.id, function(err, hash) {
      if (err) return res.send(err);
        
      client.id = hash;
      return;
    });
    //client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;
    
    console.log("hashsed id:"+client.id);
  
  client.save(function(err) {
      if (err) return res.send(err);
      
      res.json({ message: "A new client: " + client.name + " added to the locker", data: client });
  });
};

exports.getClients = function(req, res) {
  Client.find({ userId: req.user._id }, function(err, clients) {
      if (err) return res.send(err);
      
      res.json(clients);
  });  
};

