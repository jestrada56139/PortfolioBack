var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name : string,
    email : string,
    message : string,

});

module.exports = mongoose.model('contactSchema', contactSchema)