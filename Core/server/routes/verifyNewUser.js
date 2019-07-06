var express = require("express");
const admin = require("firebase-admin");
var router = express.Router();
var db = admin.firestore();

/**
 * @api {post} /verifynewuser/        Verify New User 
 * @apiName VerifyNewUser
 * @apiGroup User
 *
 * @apiParam {String} uid             User's firebase AUTH user ID
 *
 * @apiSuccess {Object} data          Response data object
 * @apiSuccess {string} data.code     Response code
 * @apiSuccess {String} data.message  Response message
 * 
 * @apiError {Object} data            Response data object
 * @apiError {string} data.code       Response code
 * @apiError {String} data.message    Response message
 * 
 */
router.post("/", function(req, res, next) {
  let uid = req.body.uid;

  let usersRef = db.collection("users").doc(uid);

  usersRef.create({
    uid: uid,
    accessTier: 0,
    remainingSearches: 20,
    totalSearches: 0,
    admin: false,
    beta: true,
  }).then(response => {
    console.log(`User inserted into DB`);
    res.send({code: 'success', message: 'Inserted user into database'});
  }).catch((err) => {
    console.log(`Failed to create document: ${err}`);
    res.send({code: 'failure', message: 'Cannot insert user into database'});
  });

  // usersRef.set({
  //   uid: uid,
  //   accessTier: 0,
  //   remainingSearches: 30,
  //   totalSearches: 0,
  //   admin: false,
  //   beta: true,
  // }, {merge: false}); 

/* ****** TO DO: TRY/CATCH WITH SERVER RESPONSE CODES ***/


    // search for specified user in DB
  // usersRef
  //   .get()
  //   .then(doc => {
  //       // if user does not exist, create user in DB
  //     if (!doc.exists) {
  //       usersRef.set({
  //           uid: uid,
  //           accessTier: 0,
  //           remainingSearches: 100,
  //           totalSearches: 0,
  //         });    
  //         console.log('Created user in DB');
  //         res.send({code: 1, message: 'Inserted user into database'});
  //     }else{
  //       console.log('Document data:', doc.data());
  //       res.send({code: 0, message: 'User already exists in database'});
  //     }
  //   })
  //   .catch(err => {
  //     console.log("Error getting document", err);
  //     res.send({code: -1, message: 'Error fetching document'});
  //   });
});
module.exports = router;
