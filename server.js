const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const db = require("./models")
require('dotenv').config()
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const passport = require('passport')
const session = require('express-session')
const Auth0Strategy = require('passport-auth0');
const router = express.Router();

const app = express()

const PORT = process.env.PORT || 3000

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_CLIENT_ID in your .env file';
}

const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
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
)
app.use(passport.initialize())
app.use(passport.session())
app.engine("handlebars", exphbs({ defaultLayout: "nema-temp"}))
app.set("view engine", "handlebars")

const routes = require('./routes/index')

app.use(routes)


db.sequelize.sync({ force: false }).then( () => {
	app.listen(PORT, () => {
		console.log("App listening on PORT: " + PORT)
	})
})