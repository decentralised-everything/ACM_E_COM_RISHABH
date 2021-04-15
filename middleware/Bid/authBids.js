const Users = require("../../models/Users");

let req, res;
const authBids = () => {
  // object refers to "object" on the page
  for (let i = 0; i < res.locals.object.bids.length; i++) {
    const bid = res.locals.object.bids[i];

    // finding user of that particular bid
    Users.findById(bid.bidderUser._id, (err, user) => {
      if (err) {
        // error: something that can't be avoided no matter what
        res.send(err);
        return res.end();
      } else {
        if (bid.wallet > user.wallet) {
          // won't be removing seller bid because it is the basis of minimum price
          if (res.locals.object.sellerUser._id === user.id) {
            console.log(
              "Seller can't be removed, they decide MRP / very first bid, does not depend on wallet"
            );
          } else {
            /* imposter alert / well, it can be used as a flexibility of doing 
            mutiple bids on different products and 
            whichever gets accepted, bidder goes happy */
            for (let j = 0; j < res.locals.object.bids.length; j++) {
              // removing all bids of imposter
              if (res.locals.object.bids[j].bidder._id === user.id) {
                // splice removes the current data at the particular index
                res.locals.object.bids.splice(j, 1);
                j--; // since splice shifts the array one step back, we ensure nothing gets missed
              }
            }
            i = -1; // end of of loop will increment index, so -1 + 1 will lead to 0
            res.json({
              message: "The bids of this User was removed",
              user: user,
            });
          }
        }
      }
    });
  }
};

const startAuth = async (req, res, next) => {
  req = req;
  res = res;
  authRun = setInterval(authBids, 600000);
  // authenticator authenticates at every 10mins of interval
  // ensuring server does not lag a lot due to mutiple authentications, 10mins is kept
  next();
};
const stopAuth = () => {
  clearInterval(authRun);
};

module.exports = { startAuth, stopAuth };
