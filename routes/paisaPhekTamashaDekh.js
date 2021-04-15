// bidding area xD

const prodData = require("../middleware/Product/GetProductData");
const { Router } = require("express");
const { EventEmitter } = require("events");
const authBid = require("../middleware/Bid/addBid");

const synchronize = new EventEmitter();
const router = Router();

const syncBids = async (req, res) => {
  const product = res.locals.object;
  res.json({ type: "object", object: product });
  synchronize.listen(`${res.locals.object.id}-sync`, (bid) => {
    res.json({ type: "sync", bid: bid });
  });

  synchronize.listen(`${res.locals.object.id}-exit`, (bid) => {
    res.json({ type: "over", bid: bid });
  });
};
