const { stopAuth } = require("./authBids");

const productStatus = async (req, res) => {
  switch (res.locals.bidStatus) {
    case "sync":
      res.locals.object.save();
      break;
    case "over":
      stopAuth();
      res.locals.object.remove();
      // properties set to undefined (I guess)
      res.locals.object = undefined; // just for being sure
      break;
    default:
      break;
  }
};

module.exports = productStatus;
