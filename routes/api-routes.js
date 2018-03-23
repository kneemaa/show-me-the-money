const express = require("express");
// const bodyParser = require("body-parser");
const db = require("../models");
const currencyFormatter = require('currency-formatter');


// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(express.static("public"))

// const PORT = process.env.PORT || 3000

// db.sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => {
//         console.log("App listening on PORT: " + PORT)
//     })
// })


module.exports = function (app) {

    //Create Account/
    app.post("/api/user/", function (req, res) {
        db.Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        }).then(function (result) {
            res.json(result);
        });
    });

    //Account lookup
    app.get("/api/user/:email", function (req, res) {
        db.Users.findAll({
            email: req.params.email,
        }).then(function (result) {
            res.json(result)
        });
    });

    //Portfolio Info from DB -- pass in User ID
    app.get("/api/portfolio/:id", function (req, res) {
        db.Users.findAll({
            where: {
                id: req.params.id,
            },
            include: [db.Ledger]

        }).then(function (result) {
            const unformattedBalance = result[0].dataValues.account_balance;
            const formattedBalance = currencyFormatter.format(
                unformattedBalance, { code: 'USD' });
            const stockArray = [];
            const userLedger = result[0].dataValues.Ledgers;
            console.log(userLedger);

            var stock_detail = [];
            
            for (var i = 0; i < userLedger.length; i++) {
                console.log(result[0].dataValues.Ledgers[i].dataValues.symbol);
                stockArray.push(result[0].dataValues.Ledgers[i].dataValues.symbol);
                var thisStock = {
                    stockID: result[0].dataValues.Ledgers[i].dataValues.symbol,
                    quantity: result[0].dataValues.Ledgers[i].dataValues.stock_count,
                    price_paid: result[0].dataValues.Ledgers[i].dataValues.purchase_price,
                    market_value: 0,
                    total_gain: 0,
                    profit: 0,
                }
                stock_detail.push(thisStock);
                console.log(thisStock);
                // portfolioValue = function(a,b) {                

                // }
                
            };

            const formattedResult = [
                {
                    user_email: result[0].dataValues.email,
                    user_value: 0,
                    user_available: formattedBalance,
                    stock_detail3: stock_detail


                }
            ];

            console.log(formattedResult);

            res.json(formattedResult);

            // // FOR FRONT END AJAX
            // // const unformattedBalance = result[0].dataValues.account_balance;
            // console.log(unformattedBalance);
            // // const formattedBalance = currencyFormatter.format(
            // // unformattedBalance, { code: 'USD' });
            // console.log(formattedBalance);
            // const userName = result[0].dataValues.first_name +
            //     " " + result[0].dataValues.last_name;
            // console.log(userName);

            // console.log(stockArray);

        });
    });

    //User Ledger
    app.get("/api/ledger/:id", function (req, res) {
        db.Users.findAll({
            where: {
                id: req.params.id,
            },
            include: [db.Ledger]

        }).then(function (result) {
            res.json(result);

            const userLedger = result[0].dataValues.Ledgers;
            console.log(userLedger);

        });
    });

    //Buy Route
    app.post("/api/buy/:id&:symbol&:purchase_price", function (req, res) {
        db.Ledger.create({
            symbol: req.params.symbol,
            purchase_price: req.params.purchase_price,
            stock_count: 5,
            is_owned: true,
            UserId: req.params.id,

        }).then(function (result) {
            res.json(result)
        });
    });

    //--Search Stock External API call
    app.get("/api/search/:symbol", function (req, res) {
        const symbol = req.params.symbol;
        //NOT DONE YET
    });


    //FOR API Link at bottom of view.//

    //All Users
    app.get("/api/all/", function (req, res) {
        db.Users.findAll({

        }).then(function (result) {
            res.json(result);
        });
    });

    //All Ledger History
    app.get("/api/history/", function (req, res) {
        db.Ledger.findAll({

        }).then(function (result) {
            res.json(result);
        });
    });

}; //module.exports close