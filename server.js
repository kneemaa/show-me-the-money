const express = require("express")
const bodyParser = require("body-parser")
const exphbs = require('express-handlebars')
const db = require("./models")
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
//app.use(express.static("public"))
app.engine("handlebars", exphbs({ defaultLayout: "main"}))
app.set("view engine", "handlebars")
//routes here
/*const routes = require('./routes/index')
const user = require('./routes/user')*/

require("./routes/routes")(app)

db.sequelize.sync({ force: false }).then( () => {
	app.listen(PORT, () => {
		console.log("App listening on PORT: " + PORT)
	})
})