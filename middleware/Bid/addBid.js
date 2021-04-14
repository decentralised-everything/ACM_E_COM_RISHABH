const bidderBid = require("../../models/Users");

// required to authenticate every bid before being added
const authBid = async (req, res, next) => {
  // won't be judging seller's bid since it would be the basis of providing the minimum "price"
  if (res.locals.object.sellerUser._id === req.body.bidderBid.id) {
    console.log(
      "seller can set the MRP without any restriction i.e. the very first bid"
    );
    res.locals.object.bids.push(req.body.bidderBid);
    res.locals.object.save();
    /* if the seller tries to be a oversmart guy and adds mutiple bids to raise price, might think of 
    a function to take care or bidders can abandon the further bids */
    res.send("The price was set");
  } else {
    if (
      /* checking if bidder's wallet has sufficient money to bid on and sufficiently large
    to surpass the highest bid in the current "bids array"  */
      req.body.bidderBid.wallet >=
        res.locals.object.bids[res.locals.object.bids.length - 1].wallet &&
      req.locals.user.wallet >= req.body.bidderBid.wallet
    ) {
      res.locals.object.bids.push(req.body.bidderBid);
      res.locals.object.save();
      // since the criterias are checked, the bid shall be added
      res.send(
        `Your bid is pushed to bids of value: ${
          req.body.bidderBid.wallet
        } and remaining value in wallet if bid is accepted: ${
          user.wallet - req.body.bidderBid.wallet
        }`
      );
    } else {
      // sufficient money not present or the bid is smaller than highest bid in the array
      res.send(`Have a look at your wallet: ${user.wallet}`);
      return res.end();
    }
    next();
  }
};

module.exports = authBid;
