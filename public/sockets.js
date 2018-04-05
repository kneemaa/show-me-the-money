$(document).ready(function(){
    let userSignedIn = false
    
    // Make connection
    // this 'socket' is a separate frontend socket variable
    // and not connected to the one in server on the backend
    var socket = io(window.location.origin || 'http://localhost:3000');
    // var userID = faker.random.uuid
    let userID;
    let userInfo = {}
    
    
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
    if ($("#user_email").attr("data-id")) {
        userID = $("#user_email").attr("data-id")
        console.log(userID);

        $.ajax({
            url: "http://localhost:3000/api/portfolio/" + userID,
            method: 'GET'
        }).done(function(result){
            
            const stockPortfolio = result.stock_array.join(",");
            console.log(stockPortfolio);
            userInfo = {
                userID: userID,
                stocks: stockPortfolio
            }
            userSignedIn = true;
            socket.emit("loggedin", userInfo); // sends the user id
        })
       
    } 
})
    // receives portfolio emit from server
    socket.on("portfolio", function(data){
        console.log(data.symbol);
        lastPrice = "#last-price-" + data.symbol;
        $(lastPrice).html(data.price);

    })
    
})

