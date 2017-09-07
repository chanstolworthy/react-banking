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

//AUTHENTICATION





let port = 3000;
app.listen(port, ()=> {
    console.log(`Listening on port: ${port}`);
})