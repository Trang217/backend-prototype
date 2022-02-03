const Badge = require("../models/Badge");
const { tryCatchHelper } = require("../helpers/tryCatchHelper");

exports.CreateBadge = tryCatchHelper(async (req, res, next) => {
  const { body } = req;

  const newBadge = await Badge.create({
    user: body.user,
    ecosystem_Name: body.ecosystem_Name,
    score: body.score,
  });

  return res
    .status(200)
    .json({ status: "New badge added successfully", newBadge });
});

exports.listBadgeByUser = tryCatchHelper(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const skipRows = (page - 1) * pageSize;

  const badges = await Badge.find({ user: req.params.user_id })
    .skip(skipRows)
    .limit(pageSize);

  return res.status(200).json({ message: "list of badge", badges });
});
