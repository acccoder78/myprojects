var http = require('http');
var fs = require('fs');
var app = require('express')();
var nodeCache = require('node-cache');
var serverCache = new nodeCache({errorMissing: true});
var baseFormStr = "";
var clientForm = 'client.html';

var server = http.createServer(function(req, res) {
    var url = require('url').parse(req.url, true);
    console.log("the URL is:\n"+url.pathname);
    var clientFormStr = "";
    switch (url.pathname)     {
        case '/':
            serverCache.get('clientForm', function(err, value) {
                var fsClientReadStream = fs.createReadStream(clientForm);
                var chunk="";
                if (err) {
                    fsClientReadStream.on('readable', function() {
                        while((chunk=fsClientReadStream.re()) != null) {
                            clientFormStr += chunk;
                        }
                    });
                    fsClientReadStream.on('end', function() {
                        serverCache.set('clientForm', clientFormStr, function(err, success) {
                            if (!err && success) console.log("client form cached successfully");
                        });
                    });
                }
                else clientFormStr = value;
                console.log("the clientformstr is: \n"+clientFormStr);
            });
            //fs.createReadStream('client.html').pipe(res) ;
            res.write(clientFormStr, function() {
               console.log("client form rendered") ;
            });
            break;
        default:
            console.log("invalid URL");
    }
}).listen(process.argv[2]);