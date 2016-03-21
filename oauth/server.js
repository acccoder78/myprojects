var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.port || 3000;
var router = express.Router();
var Beer = require('./models/beer');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.get('/', function(req, res) {
    res.json({message: "you are running low on beer!"});
});

router.route('/beers')
    .post(beerController.addBeer)
    .get(beerController.getBeers);

router.route('/beers/:beer_name')
    .get(beerController.getBeerByName);

router.route('/beers/:beer_id')
    .get(beerController.getBeerById)
    .put(beerController.putBeer)
    .delete(beerController.deleteBeer);

router.route('/users')
    .post(userController.addUsers)
    .get(userController.getUsers)
    .delete(userController.removeUser);
    
app.use('/api', router);

app.listen(port);