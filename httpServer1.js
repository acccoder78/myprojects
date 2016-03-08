var http = require('http');
var fs = require('fs');
var done = Boolean(false);
var flag = '';
var goOn = Boolean(true);

var server = http.createServer(function(req, res) {
    console.log("got the arguments:"+process.argv);
    var fsReadStream = fs.createReadStream(process.argv[3]);
    var chunk = "";
    
    fsReadStream.on('readable', function() {
        while (goOn) {
            console.log("The chunk is : "+chunk);
            console.log("The flag is: "+flag);
            if (((chunk = fsReadStream.read()) != null) && (chunk.toString().search("close stream") != 1)) {
                    res.write(chunk);
            }
            else goOn = Boolean(false);
        }
        done = Boolean(true);
    });
    
    fsReadStream.on('end', function(){
        console.log("reached the end of readable stream");
        /*if (!done) {
            flag = 'emitted';
            console.log("re-emitting readable event");
            fsReadStream.emit('readable');
            //return;
        }*/
       console.log("The readstream is done") ;
       res.end("we are done here!");
    });
    
}).listen(process.argv[2]);