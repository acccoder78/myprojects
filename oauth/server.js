var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.port || 3000;
var router = express.Router();
var Beer = require('./models/beer');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/beerlocker');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

router.get('/', function(req, res) {
    res.json({message: "you are running low on beer!"});
});

router.route('/beers')
    .post(authController.isAuthenticated, beerController.addBeer)
    .get(authController.isAuthenticated, beerController.getBeers);

//router.route('/beers/:beer_name')
  //  .get(authController.isAuthenticated, beerController.getBeerByName);

router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeerById)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);
    
router.route('/beers/all')
    .delete(authController.isAuthenticated, beerController.deleteAll);

router.route('/users')
    .post(userController.addUsers)
    .get(userController.getUsers)
    .delete(authController.isAuthenticated, userController.removeUser);
    
app.use('/api', router);

app.listen(port);