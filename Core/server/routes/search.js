var express = require("express");
var router = express.Router();
var ticketSearch = require("../functions/radiusSearch");
var moment = require("moment");
const admin = require("firebase-admin");
var db = admin.firestore();

const TICKET_LIMIT = 100;

/**
 * @api {post} /search/ Search For Tickets
 * @apiName SearchTickets
 * @apiGroup Search
 *
 * @apiParam {Object} body  
 * @apiParam {String} body.uid                                  Firebase Auth User ID
 * @apiParam {Boolean} body.oneWay                              Boolean Representing One Way/Round Trip
 * @apiParam {String} body.from                                 Airport IATA Code
 * @apiParam {String} body.to                                   Airport IATA Code
 * @apiParam {String} body.radiusFrom                           Radius around departure airport
 * @apiParam {String} body.radiusTo                             Radius around arrival airport
 * @apiParam {Object} body.departureWindow                      
 * @apiParam {Date} body.departureWindow.start              Start of departure window
 * @apiParam {Date} body.departureWindow.end                End of depparture window
 * @apiParam {Object} body.returnDepartureWindow    
 * @apiParam {Date} body.returnDepartureWindow.start        Start of return departure window
 * @apiParam {Date} body.returnDepartureWindow.end          End of return departure window
 * 
 * @apiParamExample {json} Request-Structure-Example:
 *     searchData: {
 *       uid: "abc123def456ghi789jkl",
 *       oneWay: false,
 *       from: "LAX",
 *       to: "JFK",
 *       radiusFrom: "100",
 *       radiusTo: "100",
 *       departureWindow: {
 *         start: new Date(),
 *         end: new Date()
 *       },
 *       returnDepartureWindow: {
 *         start: new Date(),
 *         end: new Date()
 *       }
 *     }            
 *
 * @apiSuccess {Number} code                  Response code
 * @apiSuccess {String} message               Response message
 * @apiSuccess {Object} [tickets]               Tickets Object
 * @apiSuccess {Array} [tickets.data]           Array of tickets in tickets object
 * @apiSuccess {Number} remainingSearches     User's remaining searches
 * 
 * @apiError {string} code            Response code
 * @apiError {String} message         Response message
 * 
 */

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
        res.send({ code: -1, message: "User does not exist in database" });

        // if user exists, grab user data
      } else {
        const USER = doc.data();
        
        // if user has remaining searches, do search and respond with tickets
        if (USER.remainingSearches > 0 || USER.admin) {
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

              // if not admin...
              if (!USER.admin) {
                // decrement remaining searches
                var decrementSearches = USER.remainingSearches;
                decrementSearches--;

                // Update user data in firestore
                usersRef.update({ remainingSearches: decrementSearches });
              }

              // send response with tickets
              res.send({
                code: 1,
                remainingSearches: USER.remainingSearches,
                tickets: results,
                message: "Ticket Search Successful"
              });
            });

          // if user does not have any remaining searches, do not do search
        } else {
          res.send({ code: 0, message: "No remaining searches" });
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
