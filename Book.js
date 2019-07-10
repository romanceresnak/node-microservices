const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  numberPages: {
    type: Number,
    require: true
  },
  publisher: String,
  require: false
});

module.exports = mongoose.model("books", bookSchema);
