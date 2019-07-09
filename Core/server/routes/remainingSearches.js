var express = require("express");
var router = express.Router();
const admin = require("firebase-admin");
var db = admin.firestore();

/**
 * @api {post} /remainingsearches/              Remaining Searches
 * @apiName RemainingSearches
 * @apiGroup User
 *
 * @apiParam {String} uid                       User's firebase AUTH user ID
 *
 * @apiSuccess {Object} data                    Response data object
 * @apiSuccess {Number} data.code               Response code
 * @apiSuccess {String} data.message            Response message
 * @apiSuccess {Number} data.remainingSearches  Number of remaining searches user has
 * @apiSuccess {Boolean} data.isVIP             Specifies whether the user is a VIP or not
 * @apiSuccess {Boolean} data.isBeta            Specifies whether the user is a beta user or not
 * 
 * @apiError {Object} data                      Response data object
 * @apiError {Number} data.code                 Response code
 * @apiError {String} data.message              Response message
 * 
 */

router.post("/", function(req, res, next) {
  const UID = req.body.uid;

  // create reference to user document in the firebase "users" collection
  let usersRef = db.collection("users").doc(UID);

  // find user in collection
  usersRef
    .get()
    .then(doc => {
      // if user does not exist, respond with error code
      if (!doc.exists) {
        res.send({ code: 0, message: "User does not exist in database" });

        // if user exists, grab user data
      } else {
        const USER = doc.data();
        res.send({
          code: 1,
          message: "User exists, lookup successful",
          remainingSearches: USER.remainingSearches,
          isVIP: USER.VIP,
          isBeta: USER.beta,
        });
      }
    }) // any firebase error, respond with error code
    .catch(err => {
      res.send({ code: -1, message: err });
    });

  //   res.send({server: 'running'});
});

module.exports = router;
