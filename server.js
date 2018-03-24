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


    // Socket setup 
    // this socket connects the server to the clients
    var io = socket(server);

      // listens for a connection and calls the connection method
      // which then runs the function callback with the paramater
      // socket referring to the socket between the server and THAT client
    io.on('connection', function(socket){
        console.log("Made socket connection " + socket.id);
        // here an below sets up a new user specific IEX connection 
        // subscribes to stocks from variable
        // and delivers the result to the client
        var iex = require("socket.io-client")('https://ws-api.iextrading.com/1.0/tops');

        //receives "loggedin" emit from index.js
        socket.on("loggedin", (user) => {
            const { id, stocks} = user;
            // will send out message back through socket when subscription data received from below
            iex.on('message', message => {
                let data= JSON.parse(message)
                let symbol = data.symbol;
                let lastPrice = data.lastSalePrice;
                console.log("Symbol: " + symbol + ", Price: " + lastPrice)
                socket.emit("portfolio", {symbol: symbol, price: lastPrice});
            })

            //connect to the channel, and subscribe to the stocks sent in user

            iex.on("connect", () => {
              iex.emit("subscribe", "aig,fb,nke")
                // iex.emit("subscribe", stocks.join(",")) //will be dynamic data from db
                // below was hard coded practice data 
                // var newData = {
                //     stocks,
                //     money: stocks.length * 100
                // }

                // setInterval(() => {
                //     socket.emit("newData", newData)
                // }, 3000);
            })

            // iex.on("message", message => {
            //     console.log(message)
            //     // process data and send back to user on each update from IEX
            //     socket.emit("newData", 'some stock data here')
            // })

        })


        socket.on('disconnect', function(){
    		console.log('user disconnected');
    		iex.close();

        });
    });

    // Listen to the channel's messages
    IEXsocket.on('message', message => {
            let data= JSON.parse(message)
            let symbol = data.symbol;
            let lastPrice = data.lastSalePrice;
            // console.log("Symbol: " + symbol + ", Price: " + lastPrice)
            io.sockets.emit("broadcast", {symbol: symbol, price: lastPrice});
    })

    // Connect to the channel
    IEXsocket.on('connect', () => {

      // Subscribe to topics (i.e. appl,fb,aig+)
      IEXsocket.emit('subscribe', 'ibm,fb,f,x')

      // Unsubscribe from topics (i.e. aig+)
    //   IEXsocket.emit('unsubscribe', 'aig+')
    })

    // Disconnect from the channel
    IEXsocket.on('disconnect', () => console.log('Disconnected.'))

})
