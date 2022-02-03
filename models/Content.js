const { Schema, model } = require("mongoose");

const quizSchema = new Schema({
  question: {
    type: String,
    required: [true, "Please add the question!"],
    unique: true,
  },
  correct_answer: {
    type: String,
    required: [true, "Please add the correct answer!"],
  },
  incorrect_answers: {
    type: [String],
    required: [true, "Please add incorrect answers!"],
  },
  message: {
    type: String,
    required: [true, "Please add message!"],
  },
});

const itemSchema1 = new Schema({
  item_1: [String],
  item_2: [String],
  item_3: [String],
});

// const itemSchema2 = new Schema({
//   title: { type: String },
//   info: { type: String },
// });

const contentSchema = new Schema({
  ecosystem: {
    type: String,
    required: [true, "Please add name of ecosystem!"],
    unique: true,
  },
  definition: {
    type: String,
    required: [true, "Please add definition of ecosystem!"],
    unique: true,
  },

  items: itemSchema1,
  //items: [itemSchema2],

  quiz: [quizSchema],
});

const Content = model("Content", contentSchema);

module.exports = Content;
