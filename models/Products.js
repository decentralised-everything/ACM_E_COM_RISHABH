const mongoose = require("mongoose");
const Bidder = require("./Bidder");
const Users = require("./Users");

const productsSchema = new mongoose.Schema({
  // "User" who is a "Seller"
  sellerUser: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Users",
  },
  price: {
    /* MRP of product, which will be the very first "bid" of any "product", 
    redirection of "sellerUser" to bidding page after creation */
    type: Number,
    required: true,
  },
  bids: [
    // bids will be an array of mutiple bids by mutiple "users" for a "product" owned by "sellerUser"
    {
      type: mongoose.Schema.ObjectId,
      ref: "Bidder",
      // connects wallet that will be used to store the amount bid and compared with actual wallet as a user
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;
