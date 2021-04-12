const Products = require("../models/Products");

const authProduct = async (req, res, next) => {
  // "email" used token for authentication
  if (req.body.object.sellerUser.email === res.locals.user.email) {
    // creating new product, provided valid necessary details
    Products.create(req.body.object, (err, product) => {
      if (err) {
        res.status(500).send(err);
        // unavoidable
      } else {
        res.locals.object = product;
      }
    });
  } else {
    res.send(`Only authorized to ${req.body.object.sellerUser.email}`);
  }
  next();
};

module.exports = authProduct;
