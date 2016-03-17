var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = process.env.port || 3000;
var router = express.Router();
var beer = require('./models/beer');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/beerlocker');

router.get('/', function(req, res) {
    res.json({message: 'you are running low on beer!'});
});

app.use('/api', router);

app.listen(port);