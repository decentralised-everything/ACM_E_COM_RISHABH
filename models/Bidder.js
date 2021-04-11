const mongoose = require("mongoose");
const Users = require("./Users");

const bidderSchema = new mongoose.Schema({
  bidderUser: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Bidder = mongoose.model("bidder", bidderSchema);

module.exports = Bidder;
