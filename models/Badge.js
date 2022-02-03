const { Schema, model } = require("mongoose");

const badgeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ecosystem_Name: {
    type: String,
    required: [true, "Please provide name of ecosystem!"],
  },
  score: {
    type: Number,
    required: [true, "Please provide score!"],
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

const Badge = model("Badge", badgeSchema);

module.exports = Badge;
