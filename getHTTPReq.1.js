var req = require('http');

module.exports.getReq = function (args, fName, callback) {
    var fs = require('fs');
    var async = require('async');
    var resStr = "";
    var index = Number(1);

    console.log("\n \n The args length is : "+args.length);
    console.log("The file is : "+fName);

    async.forEach(args.splice(3,args.length-3), function(url, loopCallback){
        console.log("The URL is: "+url);
        req.get(url, function (res){
            res.on('data', function (data) {
                resStr += data;
            }).on('end', function(){
               loopCallback();
            });
        }).on('error', function(err) {
                console.log("there was an error in reading: \n"+err);
            });
        }, function() {
        console.log("*****The res string is*****: "+resStr);
        fs.open(fName, 'w', function (err, fd){
            if (err) console.log("error creating file");
        
            fs.writeFile(fName, resStr, function (err){
                if (err) console.log("error while writing to file:");
            });
            fs.close(fd, function (err) {
                if (err) console.log("there was an error clsoing the file");
            });
            return callback(resStr);
        });
    });
};

