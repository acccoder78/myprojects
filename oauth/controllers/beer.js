var Beer = require('../models/beer');

exports.addBeer = function(req, res) {
    var beer = new Beer();
    
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    
    Beer.save(function(err) {
        if (err) return res.send(err);
        
        res.json({message: "Beer '"+ beer.name + "' added to the locker!"});
    });
}

exports.getBeers = function(req, res) {
    Beer.find(function(err, beers) {
        if (err) return res.send(err);
        
        res.json(beers);
    });
}

exports.getBeerById = function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err) return res.send(err);
        
        res.json(beer);
    });
}

exports.getBeerByName = function(req, res) {
    Beer.findById({name: req.params.beer_name}, function(err, beer) {
        if (err) return res.send(err);
        
        res.json(beer);
    });
}

exports.putBeer = function(req, res) {
    Beer.find(req.params.beer_id, function(err, beer) {
        if (err) return res.send(err);
        
        beer.quantity = req.body.quantity;
        
        beer.save(function(err) {
            if (err) return res.send(err);
            
            res.json(beer);
        });
    });
}

exports.deleteBeer = function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err) return res.send(err);
        
        var msg = "";
        
        if ((beer.quantity === undefined) || (beer.quantity <= 0)) {
            Beer.findByIdAndRemove(req.params.beer_id, function(err) {
                if (err) return res.send(err);
            });
            
            msg = "Beer '" + beer.name + "' has been removed from locker!";
        }
        else {
            msg = "Beer '" + beer.name + "' not removed from locker as its not empty yet!";
        }
        res.json({message: msg});
    });
}
