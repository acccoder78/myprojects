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
    
    if ((!client.isModified('id')) || (!client.isModified('secret'))) callback();
    
    bcrypt.getSalt(5, function(err, salt) {
        if (err) return callback(err);
        
        switch (client) {
            case client.isModified('id'):
                // code
                bcrypt.hash(client.id, salt, null, function(err, hash) {
                    if (err) return callback(err);
                    
                    client.id = hash;
                    callback();
                });
                break;

            case client.isModified('secret'):
                // code
                bcrypt.hash(client.secret, salt, null, function(err, hash) {
                    if (err) return callback(err);
                    
                    client.secret = hash;
                    callback();
                });
                break;
            
            default:
                // code
                callback();
        }
    });
});
    
module.exports = mongoose.model('Client', ClientSchema);