const Product = require("../models/Products");

const sendProduct = async (req, res) => {
  Product.find((err, products) => {
    if (err) {
      // will be helpful in sending required details of products
      res.status(500).send(err);
    } else {
      res.status(200).send(products);
    }
  });
};
module.exports = sendProduct;
