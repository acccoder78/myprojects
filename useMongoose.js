var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log("creating schemas");
    
    var movieSchema = new mongoose.Schema({
        title: {type: String},
        rating: String,
        releaseYr: Number,
        hasCreditCookie: Boolean
    });
    
    var Movie = mongoose.model('Movie', movieSchema);
    
    var thor = new Movie({
        title: "Thor",
        rating: "PG-13",
        releaseYr: 2013,
        hasCreditCookie: true
    });
    
    thor.save(function(err, thor) {
        if (err) {
            console.log("*** Error!!!");
            return console.error(err);
        }
        console.dir(thor);
    });
    
    Movie.find({title: "Thor"}, function(err, movies) {
        if (err) return console.error(err);
        
        console.dir(movies);
    });
});

mongoose.connect('mongodb://localhost/test');

