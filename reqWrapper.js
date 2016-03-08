var httpReq = require('./getHTTPReq');

var str = "";

httpReq.getReq(process.argv, process.argv[2], function (str) {
    console.log("============================================== \\n");
    console.log("got data in main prog: "+str);
});