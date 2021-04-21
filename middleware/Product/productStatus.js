const { stopAuth } = require("./authBids");

/* synchronizing since we have a authentication running in background of product
giving updates, logs and responses */

const productStatus = async (req, res) => {
  switch (res.locals.bidStatus) {
    case "sync":
      res.locals.object.save();
      break;

    // when the bidding is closed response "over" will do the work of triggering "stopAuth"
    case "over":
      stopAuth();
      res.locals.object.remove();
      // properties set to undefined (I guess)
      res.locals.object = undefined; // just for being sure
      break;

    // chalne do jaisa chal rha hai
    default:
      break;
  }
};

module.exports = productStatus;
