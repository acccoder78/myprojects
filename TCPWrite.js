var net = require('net');

console.log("Connection opened to the socket @"+process.argv[2]);

var server = net.createServer(function (socket){
    var curDate = new Date();
    console.log("The current date is:"+curDate.toISOString().replace('T',' ').substr(0,16));
    socket.end(curDate.toISOString().replace('T',' ').substr(0,16)+"\r\n");
}).listen(process.argv[2]);