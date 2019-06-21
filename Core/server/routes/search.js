var express = require("express");
var router = express.Router();
var ticketSearch = require("../functions/radiusSearch");
var moment = require("moment");
const admin = require("firebase-admin");
var db = admin.firestore();

const TICKET_LIMIT = 100;

router.post("/", function(req, res, next) {
  var userInput = {
    uid: req.body.uid,
    oneWay: req.body.oneWay,
    from: req.body.from,
    to: req.body.to,
    radiusFrom: req.body.radiusFrom,
    radiusTo: req.body.radiusTo,
    departureWindow: {
      start: {
        date: moment(req.body.departureWindow.start).date(),
        month: moment(req.body.departureWindow.start).month(),
        year: moment(req.body.departureWindow.start).year()
      },
      end: {
        date: moment(req.body.departureWindow.end).date(),
        month: moment(req.body.departureWindow.end).month(),
        year: moment(req.body.departureWindow.end).year()
      }
    },
    returnDepartureWindow: {
      start: {
        date: moment(req.body.returnDepartureWindow.start).date(),
        month: moment(req.body.returnDepartureWindow.start).month(),
        year: moment(req.body.returnDepartureWindow.start).year()
      },
      end: {
        date: moment(req.body.returnDepartureWindow.end).date(),
        month: moment(req.body.returnDepartureWindow.end).month(),
        year: moment(req.body.returnDepartureWindow.end).year()
      }
    }
  };

  // create reference to user document in the firebase "users" collection
  let usersRef = db.collection("users").doc(userInput.uid);

  // find user in collection
  usersRef
    .get()
    .then(doc => {
      // if user does not exist, respond with error code
      if (!doc.exists) {
        console.log("user does not exist");
        res.send({ code: -1, message: "User does not exist in database" });

        // if user exists, grab user data
      } else {
        USER = doc.data();

// **** NEED TO DECREMENT USER REMAINING SEARCHES *****

        // if user has remaining searches, do search and respond with tickets
        if (USER.remainingSearches > 0) {
          ticketSearch
            .radiusSearch(
              TICKET_LIMIT,
              userInput.oneWay,
              userInput.from,
              userInput.to,
              userInput.radiusFrom,
              userInput.radiusTo,
              userInput.departureWindow,
              userInput.returnDepartureWindow
            )
            .then(results => {
              res.send({ code: 1, tickets: results });
            });

          // if user does not have any remaining searches, do not do search
        } else {
          res.send({ code: 0 });
        }
      }
    })
    // any firebase error, respond with error code
    .catch(err => {
      console.log("error");
      res.send({ code: -1, message: "Error fetching document" });
    });
});

module.exports = router;
