const mongoose = require("mongoose");
const Bidder = require("./Bidder");
const Users = require("./Users");

const sellerSchema = new mongoose.Schema({
  // "User" who is a "Seller"
  sellerUser: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Users",
  },
  bids: [
    // bids will be an array of mutiple bids by mutiple "users" for a "product" owned by "sellerUser"
    {
      type: mongoose.Schema.ObjectId,
      ref: "Bidder",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  price: {
    /* MRP of product, which will be the very first "bid" of any "product", 
    redirection of "sellerUser" to bidding page after creation */
    type: Number,
    required: true,
  },
});

const Seller = mongoose.model("seller", sellerSchema);

module.exports = Seller;
