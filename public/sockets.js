$(document).ready(function(){
// import utils from "./utilities.js";

    // Make connection
    // this 'socket' is a separate frontend socket variable
    // and not connected to the one in server on the backend
    var socket = io(window.location.origin + '/callback' || 'http://localhost:3000/callback');
    var userID = faker.random.uuid
    var user = {
        id: userID,
        // stocks: userStocks
    }

    // receives "broadcast" emit from server containing the top 10 data
    socket.on("broadcast", function(data){
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

    socket.on("connect", function(){
        socket.emit("loggedin", user); // sends the user id

        socket.on("newData", function(data){
            console.log(data);
        })
    })

    // receives portfolio emit from server
    socket.on("portfolio", function(data){
        lastPrice = "#last-price-" + data.symbol;
        $(lastPrice).html(data.price);

    })

})

