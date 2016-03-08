var http = require('http');
var fs = require('fs');
var app = require('express')();
var nodeCache = require('node-cache');
var serverCache = new nodeCache({errorMissing: true});
var baseFormStr = "";
var clientForm = "client.html";

var server = http.createServer(function(req, res) {
    var url = require('url').parse(req.url, true);
    console.log("the URL is:\n"+url.pathname);
    var clientFormStr = "";
    switch (url.pathname) {
        case '/':
            clientFormStr = serverCache.get('clientForm');
            if (clientFormStr == undefined) {
                console.log("client form not cached");
                clientFormStr = "";
                var fsClientReadStream = fs.createReadStream(clientForm);
                var chunk="";
                fsClientReadStream.on('readable', function() {
                    while((chunk=fsClientReadStream.read()) != null) {
                        clientFormStr += chunk;
                       // console.log("the chunk is:"+chunk);
                    }
                });
                fsClientReadStream.on('end', function() {
                    serverCache.set('clientForm', clientFormStr, function(err, success) {
                        if (!err && success) console.log("client form cached successfully");
                    });
                    res.end(clientFormStr, function() {
                        console.log("client form rendered for the 1st time");
                    });
                });
            }
            else {
                console.log("before writing response to http output stream");
                //fs.createReadStream('client.html').pipe(res) ;
                res.write(clientFormStr, function() {
                   console.log("client form rendered") ;
                });
                res.end();
            }
            break;
            
        case '/listen':
            
            break;
            
        case '/addText':
            
            break;
            
        default:
            console.log("invalid URL");
    }
}).listen(process.argv[2]);