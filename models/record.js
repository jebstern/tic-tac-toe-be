const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let recordSchema = new Schema({
  username: {
    type: String
  },
  wins: {
    type: Number
  },
  losses: {
    type: Number
  },
  draws: {
    type: Number
  }
});

module.exports = mongoose.model("record", recordSchema);
