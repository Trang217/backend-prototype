const { tryCatchHelper } = require("../helpers/tryCatchHelper");
const Content = require("../models/Content");

exports.createEcosystem = tryCatchHelper(async (req, res) => {
  const { body } = req;

  const newEco = await Content.create({
    ecosystem: body.ecosystem,
    definition: body.definition,
    items: body.items,
    //items: [...body.items],
    quiz: [...body.questions],
  });

  return res
    .status(200)
    .json({ message: "New ecosystem is created successfully!", newEco });
});

exports.getGameContent = tryCatchHelper(async (req, res, next) => {
  console.log(req.body);
  const search = req.body.search;
  const items = await Content.findOne({ ecosystem: search }).select(
    "ecosystem items"
  );

  if (!items) {
    return next(new AppError("No items here!", 404));
  }

  return res
    .status(200)
    .json({ status: "success", message: "Found items", items });
});
