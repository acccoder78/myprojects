var http = require('http');
var fs = require('fs');
var url = require('url');
var nodeCache = require('node-cache');
var serverCache = new nodeCache({errorMissing: true});
var clientForm = "client.html";
var chatMap = {};


function renderHtml(res) {
    var clientFormStr = serverCache.get('clientForm');
    if (clientFormStr != undefined) {
        res.writeHead(200, {'Content-Type': 'text/html', 'Transfer-Encoding': 'chunked'});
        res.write(clientFormStr, function() {
            console.log("html rendered");
        });
        res.end();
    } else {
        fs.readFile(clientForm, function(err, data) {
            if (!err) {
                serverCache.set('clientForm', data, function(err, success) {
                    if (!err && success) console.log("client form cached successfully");
                });
                renderHtml(res);
            }
        });
    }
}

function getData(url, res){
    //console.log("I am listening: "+url.query.user);

    for (var i in chatMap) {
        console.log("The text: "+chatMap[i].toString());
        chatMap[i].response.write('<script type="text/javascript">parent.addText("' + url.query.user+ '", "' + url.query.text + '");</script>');        
    }

}

function listenHandler(url, res) {
    if (url.query.user in chatMap) return;
    
    chatMap[url.query.user] = {'response':res};
    console.log("the hashmap:"+chatMap.toString());
}

http.createServer(function(req, res) {
    var url = require('url').parse(req.url, true);
    console.log("the URL is:\n"+url.pathname);
    switch (url.pathname) {
        case '/':
            renderHtml(res);
            break;
            
        case '/listen':
            console.log("user: "+url.query.user);
            listenHandler(url, res);
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8', 'Transfer-Encoding': 'chunked'} );
            break;
            
        case '/addText':
            getData(url, res);
            break;
            
        default:
            console.log("invalid URL");
    }
}).listen(process.argv[2]);