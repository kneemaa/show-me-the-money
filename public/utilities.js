/*function handleLogIn(userID){
    // Ajax get for user with userEmail
    // console.log(userID, typeof(userID))
    $.ajax({
        method: "GET",
        url: "/api/portfolio/" + userID
    }).then(result => {

        $(".myStocks").empty();
        const stock = result.stock_detail
        $(".myStocks").append("<thead><tr><th>Symbol</th><th>QTY</th><th>Last Price $</th><th>Price Paid $</th><th>Market Value $</th><th>Total Gain $</th><th>Profit/Loss %</th><th>Action</th></tr></thead><tbody class='userStocks'></tbody>");
        for (i = 0; i < stock.length; i++) {
            $(".userStocks").append(`<tr><td>${stock[i].stockID}</td><td>${stock[i].quantity}</td><td id="last-price-${stock[i].stockID}"></td><td>${stock[i].price_paid}</td><td>${stock[i].market_value}</td><td id="total-gain-${stock[i].stockID}">${stock[i].total_gain}</td><td id="profit-${stock[i].stockID}">${stock[i].profit}</td><td>ACTION</td></tr>`);
        } 

    });

    $.ajax({
        method: "GET",
        url: "/api/ledger/" + userID
    }).then(result => {

        $(".userHistory").empty();
        const stock = result
        $(".userHistory").append("<thead><tr><th>Date</th><th>Symbol</th><th>QTY</th><th>Trade Price $</th><th>Total $</th><th>Action</th></tr></thead><tbody class='ledgerEntry'></tbody>");
        for (i = 0; i < stock.length; i++) {
            let date = stock[i].createdAt
            let dateTrimmed = date.substring(0, date.indexOf('T'))
            let total = stock[i].stock_count * stock[i].purchase_price
            $(".ledgerEntry").append(`<tr><td>${dateTrimmed}</td><td>${stock[i].symbol}</td><td>${stock[i].stock_count}</td><td>${stock[i].purchase_price}</td><td>${total}</td><td>Action</td></tr>`);
        }
    })
}*/

/*handleLogIn(1);*/

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