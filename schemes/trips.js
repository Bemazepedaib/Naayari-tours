var mongoose = require('mongoose');
var Scheme = mongoose.Schema;

var tripsScheme = new Scheme({

})

module.exports = mongoose.model('trips', tripsScheme)