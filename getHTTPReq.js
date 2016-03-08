/*
Do GET on set of URLs provided, by using async lib,
prepare calls and stack them up in an array (just prepare)
execute the calls in parallel using asyn.parallel
*/

var req = require('http');

module.exports.getReq = function (args, fName, getReqCallback) {
    'use strict';
    var resStr = "";
    var getCalls = [];
    var index = Number(1);
    var fs = require('fs');
    var async = require('async');
    
    console.log("\n \n The args length is : "+args.length);
    console.log("The file is : "+fName);
    
    args.splice(3,args.length-3).forEach(function(url){
        getCalls.push(function (getCallsCallback) {
                getData(url, function(str){
                console.log("### got the string ["+ index +"] ### \n"+str);
                resStr += "\nThe data from URL[" + (index++) + "]: " + url + "\n \n" + str;
                console.log("\n ++++ The res string is ++++: \n"+resStr);
                getCallsCallback();
            });
        });
    });

    async.parallel(getCalls, function(){
            console.log("*****The res string is*****: "+resStr);
            fs.open(fName, 'w', function (err, fd){
                if (err) console.log("error creating file");
            
                fs.writeFile(fName, resStr, function (err){
                    if (err) console.log("error while writing to file:");
                });
                fs.close(fd, function (err) {
                    if (err) console.log("there was an error clsoing the file");
                });
                return getReqCallback(resStr);
            });
        });
};

function getData (url, getDataCallback) {
    console.log("The URL is: "+url);
    req.get(url, function (res){
       var gotStr = "";
        res.on('data', function (data) {
            gotStr += data;
            //gotStr += JSON.stringify(res.headers);
        }).on('end', function(){
           getDataCallback(gotStr);
           return; 
        });
    }).on('error', function(err) {
        console.log("there was an error in reading: \n"+err);
    });
};