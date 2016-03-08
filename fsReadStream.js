var http = require('http');
var fs = require('fs');

    console.log("got the arguments:"+process.argv);
        var fsReadStream = fs.createReadStream(process.argv[2]);
        console.log("created the read stream");
        var data = "";
        fsReadStream.on('data', function(chunk){
           
            console.log("data read from file:"+chunk);
           data += chunk;
           //res.write(chunk,'utf8');
        });
        fsReadStream.on('end', function(){
          console.log("all data read: "+data) ;
          //res.write(data,'utf8');
        });
       //fsReadStream.pipe(res);
