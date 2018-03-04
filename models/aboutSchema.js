var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var aboutSchema = new Schema({
    body : string,

});

module.exports = mongoose.model('aboutSchema', contactSchema)