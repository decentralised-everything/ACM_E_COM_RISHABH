const Product = require("../../models/Products");

/* well, we updated the data with sorted string on each instance of addition of bid
now its time to output since if some wants to have a look */

const sendProduct = async (req, res) => {
  Product.find((err, products) => {
    if (err) {
      res.status(500).send(err);
      // huh
    } else {
      // will be helpful in sending required details of products, check product model
      res.status(200).send(products);
    }
  });
};
module.exports = sendProduct;
