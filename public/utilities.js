function handleLogIn(userID){
    // Ajax get for user with userEmail
    // console.log(userID, typeof(userID))
    $.ajax({
        method: "GET",
        url: "/api/portfolio/" + userID
    }).then(result => {
        //console.log(result);
        $("#user_email").text(result.user_email);
        $("#user_value").html(result.user_value.toString());
        $("#user_available").html(result.user_available.toString());
        

        $(".myStocks").empty();
        const stock = result.stock_detail
        $(".myStocks").append("<thead><tr><th>Symbol</th><th>QTY</th><th>Last Price $</th><th>Price Paid $</th><th>Market Value $</th><th>Total Gain $</th><th>Profit/Loss %</th><th>Action</th></tr></thead><tbody class='playerRankingTable'></tbody>");
        //console.log(result.stock_detail.length)
        for (i = 0; i < stock.length; i++) {
            $(".playerRankingTable").append(`<tr><td>${stock[i].stockID}</td><td>${stock[i].quantity}</td><td id="last-price-${stock[i].stockID}"></td><td>${stock[i].price_paid}</td><td>${stock[i].market_value}</td><td id="total-gain-${stock[i].stockID}">${stock[i].total_gain}</td><td id="profit-${stock[i].stockID}">${stock[i].profit}</td><td>ACTION</td></tr>`);
        }

    });
}

handleLogIn(1);

function createNewUser(){
    // Ajax post to create user in db
    $.ajax({
        method: "POST",
        url: "/api/...:" + userEmail
    }).then(
    // update dom with user info returned (name and money)
    )
}

function updatePortfolio(){
    // push portfolio[] through websocket to update subscriptions
    // websocket connection will update the dom
}

function searchStock(){
    // ajax get call that runs IEX api call
    $.ajax({
        method: "GET",
        url: "/api/...:" + symbol
    }).then((res) => {
        // updates dom with return info
    })
    
}

function buyStock(symbol){
    // push stock symbol to stocks[]
    stocks.push(symbol);
    console.log(stocks)

    // Maybe don't need -- Ajax call to return current price of the stock
    // $.ajax({
    //     method: "POST",
    //     url: "/api/...:" + symbol
    // })

    // do math to remove total cost from user money
    
    // update DOM

    // call updatePortfolio()
    updatePortfolio(stocks)
    
}

function sellStock(symbol){
    // remove stock from stocks[]
    let spliceIndex = stocks.indexOf(symbol);
    stocks.splice(spliceIndex, 1);
    console.log(stocks);
    // Ajax call to return the current price of the stock
    $.
    // do math to add revenue back to user money 
    // update DOM
    updatePortfolio(stocks)
}

const utils = {
    handleLogIn: handleLogIn,
    createNewUser: createNewUser,
    updatePortfolio: updatePortfolio,
    buyStock: buyStock,
    sellStock: sellStock
}
    
// export {utils};