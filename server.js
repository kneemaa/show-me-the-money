const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const db = require("./models")
require('dotenv').config()
//const ensureLoggedIn = require('connect-ensure-login');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const passport = require('passport')
const session = require('express-session')
const Auth0Strategy = require('passport-auth0');
const router = express.Router();

const app = express()

const PORT = process.env.PORT || 3000
/*
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}*/

const strategy = new Auth0Strategy(
	{
		domain: 'devious.auth0.com',
		clientID: 'bodahlDFCL8Q6SqSyVM70QA5xWeTNgP3',
		clientSecret: 'm-In24tbgp_VZatuXkWdCkZZf0FJKAMoMc_y4MCRi00LI8oVwMyLXOZUHbvCYyT3',
		callbackURL:
			process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'	
	},
	function(accessToken, refreshToken, extraParams, profile, done) {
		return done(null, profile)
	})

passport.use(strategy)

passport.serializeUser(function(user, done) {
	done(null, user)
})

passport.deserializeUser(function(user, done) {
	done(null, user)
})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  session({
    secret: 'shhhhhhhhh',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize())
app.use(passport.session())
app.engine("handlebars", exphbs({ defaultLayout: "nema-temp"}))
app.set("view engine", "handlebars")


const user = require('./routes/user')
const routes = require('./routes/index')

app.use('/', routes)
app.use('/user', user)


//const routes = require('./routes/auth-routes')
//app.use(routes);
//require('./routes/index')(app)


db.sequelize.sync({ force: false }).then( () => {
	app.listen(PORT, () => {
		console.log("App listening on PORT: " + PORT)
	})
})