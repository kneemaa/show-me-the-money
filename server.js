const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const exphbs = require('express-handlebars')
const db = require("./models")
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
//app.use(express.static("public"))
app.engine("handlebars", exphbs({ defaultLayout: "nema-temp"}))
app.set("view engine", "handlebars")
app.use(cors());
//routes here
/*const routes = require('./routes/index')
const user = require('./routes/user')*/


require("./routes/auth-api-routes")(app)
require("./routes/routes")(app)

app.use( (error, request, response, next) => {
	console.error(error.stack)
	return response.status(error.status).json({ message: error.message })
})

db.sequelize.sync({ force: false }).then( () => {
	app.listen(PORT, () => {
		console.log("App listening on PORT: " + PORT)
	})
})