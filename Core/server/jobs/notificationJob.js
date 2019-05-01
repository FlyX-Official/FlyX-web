var moment = require('moment');
var elasticsearch = require('../functions/ES_functions');
var Skypicker_API = require('../functions/skypickerAPI_functions');
var utility_functions = require('../functions/utility_functions');


var CronJob = require('cron').CronJob;



new CronJob('0 0 */1 * * *', function () {
    //minute hour day(month) month day(week)
    console.log("sending Emails");
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'flyx.management@gmail.com',
        pass: 'Baboonbois1234'
    }
    });

    var mailOptions = {
    from: 'flyx.management@gmail.com',
    to: 'fer.molina.rdz@gmail.com,bryceremick@gmail.com,maheshwar.ravuri@gmail.com,zdayscott@gmail.com',
    subject: 'Sending Email using Node.js - Test 2',
    text: 'Sorry for the spam!'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}, null, true, 'America/Los_Angeles');
