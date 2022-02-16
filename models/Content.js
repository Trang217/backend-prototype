const { Schema, model } = require("mongoose");

const contentSchema = new Schema({
  ecosystem: { type: String },
  items: {},
  questions: [],
});

const Content = model("Content", contentSchema);

module.exports = Content;
