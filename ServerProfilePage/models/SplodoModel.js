var mongoose = require("mongoose");

const splodoSchema = new mongoose.Schema({
    splodoId: Number,
    userId: String,
    title: String,
    catId: String,
    desc: String,
    iconUrl: String,
    tags: [{}]
  });

var Splodo = mongoose.model('Splodo', splodoSchema);

module.exports = {
  Splodo: Splodo
}