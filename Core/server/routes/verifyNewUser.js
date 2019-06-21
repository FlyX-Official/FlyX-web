var express = require("express");
const admin = require("firebase-admin");
var router = express.Router();
var db = admin.firestore();

router.post("/", function(req, res, next) {
  let uid = req.body.uid;

  let usersRef = db.collection("users").doc(uid);

    // search for specified user in DB
  usersRef
    .get()
    .then(doc => {
        // if user does not exist, create user in DB
      if (!doc.exists) {
        usersRef.set({
            uid: uid,
            accessTier: 0,
            remainingSearches: 5,
            totalSearches: 0,
          });    
          console.log('Created user in DB');
          res.send({code: 1, message: 'Inserted user into database'});
      }else{
        console.log('Document data:', doc.data());
        res.send({code: 0, message: 'User already exists in database'});
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
      res.send({code: -1, message: 'Error fetching document'});
    });
});
module.exports = router;
