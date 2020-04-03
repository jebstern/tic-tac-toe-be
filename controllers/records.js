const Record = require("../models/record");

exports.update = function(req, res) {
  const record = req.body;
  if (record === null || record === undefined) {
    return res.status(500).send({ error: "Invalid body content" });
  } else if (
    record.username === null ||
    record.username === undefined ||
    record.wins === null ||
    record.wins === undefined ||
    record.losses === null ||
    record.losses === undefined ||
    record.draws === null ||
    record.draws === undefined
  ) {
    return res.status(500).send({ error: "Invalid body content" });
  }

  Record.findOneAndUpdate(
    { username: record.username },
    { $inc: { wins: record.wins, losses: record.losses, draws: record.draws } },
    { new: true, fields: { _id: 0, __v: 0 } },
    function(err, doc) {
      if (err) {
        return res.status(500).send({ mode: "upsert", error: err });
      }
      console.log("doc");
      console.log(doc);
      if (doc === null) {
        res.status(500).send({ mode: "upsert", error: "User not found" });
      } else {
        return res.status(200).send(doc);
      }
    }
  );
};

exports.all = function(req, res) {
  Record.find({}, "-_id -__v", function(err, items) {
    if (err) {
      return res.status(500).send({ mode: "find", error: err });
    }
    res.status(200).send(items);
  });
};
