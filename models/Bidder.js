const mongoose = require("mongoose");
const Users = require("./Users");

const bidderSchema = new mongoose.Schema({
  // "User" who is a "Bidder"
  bidderUser: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  wallet: {
    // will be indirectly connected to "User Wallet", will be verified each time using authentication functions
    type: Number,
    required: true,
  },
});

const Bidder = mongoose.model("bidder", bidderSchema);

module.exports = Bidder;
