var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log("got the arguments:"+process.argv);
    fs.createReadStream(process.argv[3]).pipe(res);
}).listen(process.argv[2]);