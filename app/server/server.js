require('dotenv').config();

//LIST OF ALL THE DEPENDENCIES 
const express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    Auth0Strategy= require('passport-auth0'),
    massive = require('massive'),
    session = require('express-session'),
    cors = require('cors');

const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize() )
app.use(passport.session() );
app.use(bodyParser.json() );
app.use(cors() );

//THE CONNECTION STRING IS IN THE ENV FILE
//DB CONNECTION
massive(process.env.CONNECTIONSTRING).then( db => {
    app.set('db', db);
})

//AUTHENTICATION-AUTH0
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK,

}, function(accessToken, refreshToken, extraParams, profile, done){

    //WE ARE SETTING DB TO A VARIABLE SO THAT WE DONT NEED TO TYPE APP.GET MULTIPLE TIMES
    const db = app.get('db');
    
    //WE ARE CHECKING TO SEE IF USER IS IN THE DB
    //PASS THE USER DOWN THROUGH ALL STEPS SO THAT WE CAN PUT IT ON SESSIONS
    db.find_user(profile.id).then( user => {
        if(user[0]) {
            return done(null, user);
        } else {
            db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.id]).then( user => {
                return done(null, user[0]);
            })
        }
    })
}))

//THE USER IS COMING FROM THE CALLBACK FUNCTION ABOVE
passport.serializeUser(function(user, done) {
    done(null, user)
})

//THE USER IS COMING FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(user, done){
    app.get('db').find_session_user(user[0].id).then( user => {
        return done(null, user[0]);
    })
})

//ENDPOINTS

//DIRECTS USER TO AUTH0.COM, LEAVING OUT SITE, FOR THE AUTHENTICATION
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/private',
    failureRedirect: 'http://localhost:3000/#/'
}))




let port = 3001;
app.listen(port, ()=> {
    console.log(`Listening on port: ${port}`);
})