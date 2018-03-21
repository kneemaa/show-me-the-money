/*
module.exports = app => {
	app.get('/', (request, response) => {
		response.render("index")
	})

}*/
const express = require('express')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const router = express.Router()

