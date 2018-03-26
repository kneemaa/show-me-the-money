const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const db = require("./models")
const socket = require('socket.io');
const IEXsocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')

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
process.on('uncaughtException', err => {
    console.error(err)
})
const strategy = new Auth0Strategy(
	{
		domain: process.env.AUTH0_DOMAIN,
		clientID: process.env.AUTH0_CLIENT_ID,
		clientSecret: process.env.AUTH0_CLIENT_SECRET,
		callbackURL:
			process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'	
	},
	(accessToken, refreshToken, extraParams, profile, done) => {
		return done(null, profile)
	})

passport.use(strategy)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
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
app.engine("handlebars", exphbs({ defaultLayout: "main"}))
app.set("view engine", "handlebars")

const routes = require('./routes/index')
app.use(routes)
require("./routes/api-routes.js")(app);

db.sequelize.sync({ force: false }).then( () => {
	const server = app.listen(PORT, () => {
		console.log("App listening on PORT: " + PORT)
	})

    var io = socket(server);

    io.on('connection', function(socket){
        var iex = require("socket.io-client")('https://ws-api.iextrading.com/1.0/tops');

        socket.on("loggedin", (user) => {
            const { id, stocks} = user;
            iex.on('message', message => {
                let data= JSON.parse(message)
                let symbol = data.symbol;
                let lastPrice = data.lastSalePrice;
                socket.emit("portfolio", {symbol: symbol, price: lastPrice});
            })

            iex.on("connect", () => {
              iex.emit("subscribe", "aig,fb,nke")
            })
        })


        socket.on('disconnect', function(){
    		iex.close();

        });
    });

    IEXsocket.on('message', message => {
            let data= JSON.parse(message)
            let symbol = data.symbol;
            let lastPrice = data.lastSalePrice;
            io.sockets.emit("broadcast", {symbol: symbol, price: lastPrice});
    })

    IEXsocket.on('connect', () => {

      IEXsocket.emit('subscribe', 'ibm,fb,f,x')

    })

    IEXsocket.on('disconnect', () => console.log('Disconnected.'))

})
