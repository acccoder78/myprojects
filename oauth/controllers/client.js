var Client = require('../models/client');

exports.addClient = function(req, res) {
  var client = new Client({
    name: req.body.name,
    id: req.body.id,
    secret: req.body.secret,
    userId: req.user._id
  });
  
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