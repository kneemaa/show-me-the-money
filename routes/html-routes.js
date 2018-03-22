const path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render(path.join(__dirname, ""))
    });

    app.get("/index", function(req, res) {
        res.render(path.join(__dirname, ""))
    })

    app.get("/account", function(req, res) {
        res.render(path.join(__dirname, ""))
    })

    app.get("/trading", function(req, res) {
        res.render(path.join(__dirname, ""))
    })


};