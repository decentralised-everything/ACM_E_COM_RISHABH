const Bidder = require("../../models/Bidder");
const Users = require("../../models/Users");

const soldProduct = async (req, res) => {
  const userId = res.locals.user.id.toString();
  // "id" of the "user" that comes in

  const sellerId = res.locals.object.sellerUser._id.toString();
  // "id" of the "seller" of the "Product"

  if (userId === sellerId) {
    res.send("auction was confirmed, thank you for participating");

    const bidderUser = await Users.findById(res.locals.object.bids[0]._id);
    /* not to get confused with models, ever tag here with "User" points to 
    the main "User" the "bidder" and "seller" is connected from */
    const bidder = await Bidder.findById(res.locals.object.bids[0]._id);
    /* the bidder who's "wallet" was virtually used for storing 
    "bid" money and compared with original "User" wallet */
    bidderUser.wallet -= bidder.wallet;
    // removed the valid amount from the wallet of "User" ( who posed as a "bidder" )
    bidderUser.save();

    const sellerUser = await Users.findById(sellerId);
    // the seller who's product was being bid
    sellerUser.wallet += bidder.wallet;
    /* added the valid amount from the wallet of "User" ( who posed as a "bidder" ) to 
    wallet of "User" ( who posed as a "seller" ) */
    sellerUser.save();

    const remBids = [];
    // time to remove the object ("Product"), starting to remove bids
    remBids = res.locals.object.bids.map((bid) => bid.remove());
    await Promise.all(remBids);

    res.locals.object.remove();
    // Product removed
  }
};

module.exports = soldProduct;
