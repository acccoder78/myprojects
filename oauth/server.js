var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.port || 3000;
var router = express.Router();
var Beer = require('./models/beer');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.get('/', function(req, res) {
    res.json({message: "you are running low on beer!"});
});

var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
    var beer = new Beer();
    
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    
    beer.save(function(err) {
        if(err) return res.send(err);
        
        res.json({message: "added new beers to locker!", data: beer});
    });
});

beersRoute.get(function(req, res) {
    Beer.find(function(err, beers) {
        if (err) return res.send(err);
        
        res.json(beers);
    });
});

var beerNameRoute = router.route('/beers/:beer_name');

beerNameRoute.get(function(req, res) {
    Beer.findById({name: req.params.beer_name}, function(err, beers) {
        if (err) return res.send(err);
        
        res.json(beers);
    });
});

var beerIdRoute = router.route('/beers/:beer_id');

beerIdRoute.put(function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err) return res.send(err);
        
        beer.quantity = req.body.quantity;
        
        beer.save(function(err) {
            if (err) return res.send(err);
            res.json(beer);
        });
    });
});

beerIdRoute.delete(function(req, res) {
    Beer.findById(req.params.beer_id, function(err, beer) {
        if (err) return res.send(err);
        
        var msg = "";
        if (beer.quantiy <= 0) {
            Beer.findByIdAndRemove(req.params.beer_id, function(err) {
                if (err) return res.send(err);
                
                msg = "Beer '"+ beer.name + "' removed from locker!";
            });
        }
        else {
            
                msg = "Beer '"+ beer.name + "' not removed as its not empty yet!";
        }
        res.json({message: msg});
    });
});

app.use('/api', router);

app.listen(port);