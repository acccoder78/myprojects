var msum = require('./readFile.1');

msum.getSum('.','testFile', function (err, data){
    
    if (err) console.log("there was an error in the call");
    
    console.log("the sum in the main is: "+data);
});

console.log("done calling the module: ");