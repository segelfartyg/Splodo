var mongoose = require("mongoose")

const catSchema = new mongoose.Schema({
    catId: Number,
    userId: String,
    title: String,
    splodos: [],
  });


var Category= mongoose.model('Category', catSchema);

module.exports = {
  Category: Category
}