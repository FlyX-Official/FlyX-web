const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const moment = require('moment');

// routes
var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var notFoundRouter = require('./routes/notFound');
var autocompleteRouter = require('./routes/autocomplete');
var authentication = require('./routes/authentication');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/autocomplete', autocompleteRouter);
app.use('/authentication', authentication);
app.use('*', notFoundRouter);


module.exports = app;
/*

// SESSION CODE_____

const ref = firebase.initializeApp({
    credentail: firebase.credential.cert('./firebaseConfig'),
    databaseURL : 'FIXME DATABASEURL!!!'
});

const {
    NODE_ENV = 'development',
    SESSION_NAME = 'sid',
    SESSION_SECRET = 'THIS WILL PROBABLY NEED TO BE CHANGED!'
    } = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(sesson({
    store: new FirebaseStore({
    database : ref.database()
    }),

    name : SESSION_NAME,
    resave : false,
    saveUninitialized : false,
    secret : SESSION_SECRET,
    cookie: {
    sameSite: true,
    secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if(!req.session.userId)
    {
        res.redirect('/login')
    }
}

app.get('/api/login', ()=> {

  //${userId ? {}}

})

app.get('/search', redirectLogin, (req, res) =>{


})

app.post('/login', () => {
    //Redirect to the correct area after authentication
})

app.post('/register', (req, res) =>{
    res.send({
    message: `Hello ${req.body.email}! User Registered!`
    })

    
})

  // END SESSION CODE
*/