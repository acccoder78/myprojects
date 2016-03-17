var express = require('express');

var app = express();

var router = express.Router();

router.get('/hello/:name', function(req,res) {
   res.send("hello " + req.params.name + "!") ;
});

app.use('/', router);

app.listen(3000);