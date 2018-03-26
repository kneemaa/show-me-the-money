$(document).ready(function(){
// import utils from "./utilities.js";

    // Make connection
    // this 'socket' is a separate frontend socket variable
    // and not connected to the one in server on the backend
    var socket = io(process.env.AUTH0_CALLBACK_URL + '/callback' || 'http://localhost:3000/callback');

    var userID = faker.random.uuid
    // var stocks = ['snap', 'aig', 'fb', 'aapl', 'amzn', 'abt', 'ach', 'mdc', 'mfa'];
    // var randomNum = Math.floor(Math.random() * stocks.length);
    // var userStocks = stocks.slice(randomNum);

    // creates user is info to identify the socket in the server
    var user = {
        id: userID,
        // stocks: userStocks
    }

    // receives "broadcast" emit from server containing the top 10 data
    socket.on("broadcast", function(data){
        console.log(data);
        if(data.symbol === "IBM"){
            $(".profit-ibm").html(data.price)
        }
        else if(data.symbol === "X"){
            $(".profit-x").html(data.price)

        }
        else if(data.symbol === "F"){
            $(".profit-f").html(data.price)

        }
        else if(data.symbol === "FB"){
            $(".profit-fb").html(data.price)

        }
    })

    // sends the user id to the server to establish specific connection 
    // right now works on page load of /index.html    
    socket.on("connect", function(){
        socket.emit("loggedin", user); // sends the user id

        socket.on("newData", function(data){
            // stock data
            console.log(data);
        })
    })

    // receives portfolio emit from server
    socket.on("portfolio", function(data){
        lastPrice = "#last-price-" + data.symbol;
        $(lastPrice).html(data.price);
        // console.log(data);
        //--loop through table--//
        // if(data.symbol === "WFC"){
        //     let wfcPaid = 47.62;
        //     let wfcPrice = data.price
        //     let wfcValue = wfcPrice * 10
        //     let wfcGain = wfcValue - (wfcPaid * 10)
        //     $("#lastprice-wfc").html(data.price)
        //     $("#pricepaid-wfc").html(wfcPaid.toFixed(2))
        //     $("#marketvalue-wfc").html(wfcValue.toFixed(2))
        //     $("#totalgain-wfc").html(wfcGain.toFixed(2))
        // }
        // else if(data.symbol === "NKE"){
        //     let nkePaid = 55.43;
        //     let nkePrice = data.price
        //     let nkeValue = nkePrice * 10
        //     let nkeGain = nkeValue - (nkePaid * 10)
        //     $("#lastprice-nke").html(data.price)
        //     $("#pricepaid-nke").html(nkePaid.toFixed(2))
        //     $("#marketvalue-nke").html(nkeValue.toFixed(2))
        //     $("#totalgain-nke").html(nkeGain.toFixed(2))

        // }
    })

})

