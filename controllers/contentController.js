const Content = require("../models/Content");
const AppError = require("../error/AppError");
const { tryCatchHelper } = require("../helpers/tryCatchHelper");

//* get game content (name + items)

exports.getGameContent = tryCatchHelper(async (req, res, next) => {
  const search = req.params.biome;
  const gameContent = await Content.findOne({ ecosystem: search }).select(
    "ecosystem items"
  );

  if (!gameContent) {
    return next(new AppError("No content!", 404));
  }

  return res
    .status(200)
    .json({ status: "success", message: "Found quiz content!", gameContent });
});

//* get quiz content (name + questions)

exports.getQuizContent = tryCatchHelper(async (req, res, next) => {
  const search = req.params.biome;
  const quizContent = await Content.findOne({ ecosystem: search }).select(
    "ecosystem questions"
  );

  if (!quizContent) {
    return next(new AppError("No content!", 404));
  }

  return res
    .status(200)
    .json({ status: "success", message: "Found quiz content!", quizContent });
});
