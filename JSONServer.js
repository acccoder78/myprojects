var http = require('http');

var server = http.createServer(function(req, res) {
    var resStr = "";
    var url = require('url').parse(req.url, true);
    var isoDate = url.query['iso'].toString()

    isoDate = isoDate.substr(isoDate.search('T')+1,8);//.search('T');
    console.log("the query value is: "+isoDate);
    switch (url.pathname) {
        case '/api/parsetime':
            resStr = JSON.stringify({hour: Number(isoDate.substr(0,2)), minute: Number(isoDate.substr(3,2)), second: Number(isoDate.substr(6,2))});
            res.writeHead(200, { 'Content-Type': 'application/json' });
            break;
        case '/api/unixtime':
            resStr = JSON.stringify({unixtime: Number(Date.parse(url.query['iso']))});
            res.writeHead(200, { 'Content-Type': 'application/json' });
            break;
        default:
            resStr = JSON.stringify({error: "Invalid URL"});
            res.writeHead(400, { 'Content-Type': 'application/json' });
    }
    console.log("the response string is: \n"+resStr);
    res.write(resStr);
}).listen(process.argv[2]);