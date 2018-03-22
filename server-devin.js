const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT || 3000
const db = require("./models")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static("public"))

//routes here
const currencyFormatter = require('currency-formatter');


require("./routes/api-routes.js")(app);



db.sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log("App listening on PORT: " + PORT)
	})
})