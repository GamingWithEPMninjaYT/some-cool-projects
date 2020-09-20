const mongoose = require("mongoose");

const proc = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
  type: String,
})

module.exports = mongoose.model("Arc", proc)
