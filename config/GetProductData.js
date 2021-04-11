const GetProductData = async (req, res, next) => {
  const prod_id = req.body.id;
  // using product id to get to bidding page of respective product
  // to be implemented when the specific product is interacted with
  req.object = object;
  next();
};

module.exports = GetProductData;
