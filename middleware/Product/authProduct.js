const Products = require("../../models/Products");
const Bids = require("../../models/Bidder");

/* the function creates "Product", also populates the "bids" array with "bid" which 
is "bidderUser" */

const authProduct = async (req, res, next) => {
  try {
    // creating a new instance "bid" of "Bidder" to pass in "Products" that in itself has an array of "bids"
    const bid = await Bids.create({
      bidderUser: res.locals.user._id, // required "id"
      wallet: req.body.price, // required basic price that will be stored as "wallet" in "bidder"
    });

    // creating new instance of "Product"
    res.locals.object = await Products.create({
      sellerUser: res.locals.user._id, // required "id"
      price: req.body.price,
    });

    // passing in the "bid" into "bids" array
    res.locals.object.bids.push(bid);
    res.locals.object.save();

    next();
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = authProduct;
