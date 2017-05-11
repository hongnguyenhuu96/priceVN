// // Model
var mongoose = require('mongoose');

mongoose.connect('mongodb://hongnguyenhuu96:thaylongdeptrai@ds153677.mlab.com:53677/pricevn');
var Schema = mongoose.Schema;

var allPhonesSchema = new Schema({
    fptPhones: { type: Array, "default": [] },
    tgddPhones: { type: Array, "default": [] },
    date: { type: String, required: true },
});

var AllPhones = mongoose.model('AllPhones', allPhonesSchema);

module.exports = AllPhones;