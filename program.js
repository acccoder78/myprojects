var str = "[ ";

process.argv.forEach(function(arg, index, arr) {
    
    str += "\'"+arg+"\'";
    //console.log("\'" + arg + "\'");
    
    if (index < arr.length-1) str += ", ";
});

str += " ]";
console.log(str);
