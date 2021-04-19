const confirmProduct = async (req, res, next) => {
  if (res.locals.chosen_bid_id) {
    res.locals.object.remove();
    return res.send("time up");
  } else next();
};

module.exports = confirmProduct;
