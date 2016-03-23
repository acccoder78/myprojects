var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ClientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    userId: { type: String, required: true }
});

    
ClientSchema.pre('save', function(callback) {
    var client = this;

    if ((!client.isModified('id')) || (!client.isModified('secret'))) return callback();
    
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return callback(err);
        
        if (client.isModified('id')) {
            bcrypt.hash(client.id, salt, null, function(err, hash) {
                if (err) return callback(err);
                
                client.id = hash;
                callback();
            });
        }

        if (client.isModified('secret')) {
            bcrypt.hash(client.secret, salt, null, function(err, hash) {
                if (err) return callback(err);
                
                client.secret = hash;
                callback();
            });
        }

//       return callback();
    });
});
    
module.exports = mongoose.model('Client', ClientSchema);