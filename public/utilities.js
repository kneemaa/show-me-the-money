function handleLogIn(userEmail)
    // Ajax get for user with userEmail
    $.ajax({
        method: "GET",
        url: "/api/...:" + userEmail
    }).then(
        // if no user (res) then call createNewUser()
        // if user returned update dom with userInfo (name and money)
        // push stocks to stocks[]
        updatePortfolio(stocks)
    )
function createNewUser()
    // Ajax post to create user in db
    $.ajax({
        method: "POST",
        url: "/api/...:" + userEmail
    }).then(
    // update dom with user info returned (name and money)
    )
function updatePortfolio()
    // push portfolio[] through websocket to update subscriptions
    // websocket connection will update the dom

function searchStock()
    // ajax get call that runs IEX api call
    $.ajax({
        method: "GET",
        url: "/api/...:" + symbol
    }).then((res) => {
        // updates dom with return info
    })
    
    

function buyStock(symbol)
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
    

function sellStock(symbol)
    // remove stock from stocks[]
    let spliceIndex = stocks.indexOf(symbol);
    stocks.splice(spliceIndex, 1);
    console.log(stocks);
    // Ajax call to return the current price of the stock
    $.
    // do math to add revenue back to user money 
    // update DOM
    updatePortfolio(stocks)


module.exports = {
    handleLogIn: handleLogIn,
    createUser: createUser,
    updatePortfolio: updatePortfolio,
    buyStock: buyStock,
    sellStock: sellStock
}
    
