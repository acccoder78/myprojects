var fs = require('fs');


fs.stat('testFile', function (err, stats) {
    
    if (err) throw err;
    
    fs.open('testFile', 'r', (err, fd) =>{
        console.log("opened the file..");
        if (err) {
            console.log("There was an error opening the file: " + err.toString());
            throw err;
        }
        var buff = new Buffer(stats.size);
        console.log("before reading the file..");
        fs.read(fd, buff, 0, buff.length, null, (err, bytesRead, buff) => {
            if (err) {
                console.log("there was an error reading file: "+ err.toString());
                throw err;
            }
            console.log("The data read: " + buff.toString());
            var sum = 0;
            var dataArr = buff.toString().split('\n').forEach(function(row){
                sum += Number(row.split(' ').pop());
                console.log("THE SUM:  " + sum);
            });//.split(' ');
        });
        console.log("after reading the file..");
    });
    
});

