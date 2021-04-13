const Product = require("../../models/Products");

// role of this function is to obtain the highest bid on the product from the "bids" array
const GetProductData = async (req, res, next) => {
  // get id from frontend
  const { prod_id } = req.params;
  // every "Product" is a new instance of "Seller" itself, a "Seller" is basically connection between "Product" and "Bids"
  Product.findById(prod_id, (err, product) => {
    if (err) {
      res.send(err);
      return;
    } else {
      // sorts the "Object Array" based on "Number" type
      product.bids.sort((a, b) => {
        return b.wallet - a.wallet;
      });
      // the new returned "Sorted Array" replaces the database "Array"
      res.locals.product = product;
    }
  });
  next();
};

module.exports = GetProductData;
