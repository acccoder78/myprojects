var fs = require('fs');

module.exports.getSum =  function(path, file, callback) {
    var filePath = path+'/'+file;
    var sum = 0;
    fs.stat(filePath, function(err, stats) {
        if (err) return callback(err);
        fs.open(filePath, 'r', (err, fd) =>{
            console.log("opened the file..");
            if (err) {
                console.log("There was an error opening the file: " + err.toString());
                return callback(err);
            }
            var buff = new Buffer(stats.size);
            console.log("before reading the file..");
            fs.read(fd, buff, 0, buff.length, null, (err, bytesRead, buff) => {
                if (err) {
                    console.log("there was an error reading file: "+ err.toString());
                    throw callback(err);
                }
                console.log("The data read: " + buff.toString());
                var dataArr = buff.toString().split('\n').forEach(function(row){
                    sum += Number(row.split(' ').pop());
                    console.log("THE SUM:  " + sum);
                });//.split(' ');
            });
            console.log("after reading the file..");
        });
        
    });
    
    return (null, sum);
};