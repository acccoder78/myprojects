var http = require('http');
var fs = require('fs');
var url = require('url');
var nodeCache = require('node-cache');
var serverCache = new nodeCache({errorMissing: true});
var clientForm = "/index.html";
var chatMap = {};
var express = require('express');
var app = express();
//var io = require('socket.io');


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
    for (var i in chatMap) {
        console.log("The text: "+chatMap[i].toString());
        chatMap[i].response.write('<script type="text/javascript">parent.addText("' + url.query.user+ '", "' + url.query.text + '");</script>');
        //chatMap[i].
    }

}

function listenHandler(url, res) {
    if (url.query.user in chatMap) return;

    chatMap[url.query.user] = {'response':res};
    console.log("the hashmap:"+chatMap.toString());
}

/*
var httpServer = http.createServer(function(req, res) {
    var url = require('url').parse(req.url, true);
    console.log("the URL is:\n"+url.pathname);
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8', 'Transfer-Encoding': 'chunked'} );
    //renderHtml(res);
    fs.readFile(clientForm, function(err, data) {
        if (err) throw err;
        
        res.write(data, function() {
            console.log("html rendered");
        });
    });
}).listen(process.argv[2]);

*/

var httpServer = http.createServer(app);
var io = require('socket.io')(httpServer);

app.use(express.static(__dirname));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + clientForm);
})

httpServer.listen(process.argv[2]);

io.on('connection', function(client) {
    console.log("cilent connected");
    client.on('join', function(msg) {
        console.log("client says:"+msg);
        client.emit('messages', "Hello from Server" );
    });
    
    client.on('messages', function(data) {
       client.emit('toall', data) ;
       client.broadcast.emit('toall', data);
    });
});
/*var listen = io.of('/listen').on('connection', function(socket) {
    socket.on('message', function(msg) {
       console.log("get the user: "+msg) ;
       //socket.broadcast.emit('message', msg);
       io.sockets.emit('message', msg);
    });
});

var addText = io.of('/addText').on('connection', function(socket) {
    socket.on('message', function(msg) {
       console.log("get the user: "+msg) ;
       //socket.broadcast.emit('message', msg);
       io.sockets.emit('message', msg);
    });
});
*/
