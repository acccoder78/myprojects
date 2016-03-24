var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({ 
    value: { type: String, required: true },
    redirectUri: { type: String, required: true},
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

module.exports = module.model('Code', CodeSchema);
