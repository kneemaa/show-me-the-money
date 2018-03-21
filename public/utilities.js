function handleLogIn(userEmail)
    // Ajax get for user with userEmail
    // if no user (res) then call createNewUser()
    // if user returned update dom with userInfo (name and money)
    // push stocks to portfolio[]
    // then call updatePortfolio(stocks)

function createNewUser()
    // Ajax post to create user in db
    // update dom with user info returned (name and money)

function updatePortfolio()
    // push portfolio[] through websocket to update subscriptions
    // websocket connection will update the dom

function searchStock()
    // ajax get call that runs IEX api call
    // updates dom with return info


function buyStock()
    // push stock symbol to portfolio[]
    // Ajax call to return current price of the stock
    // do math to remove total cost from user money
    // update DOM
    // call updatePortfolio()
    

function sellStock()
    // remove stock from portfolio[]
    // Ajax call to return the current price of the stock
    // do math to add revenue back to user money 
    // update DOM
    // call  updatePortfolio()


module.exports = {
    handleLogIn: handleLogIn,
    createUser: createUser,
    updatePortfolio: updatePortfolio,
    buyStock: buyStock,
    sellStock: sellStock
}
    
