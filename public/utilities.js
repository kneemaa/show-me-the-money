
function createNewUser() {
    // Ajax post to create user in db
    $.ajax({
        method: "POST",
        url: (window.location.origin || 'http://localhost:3000') +"/api/...:" + userEmail
    }).then(
        // update dom with user info returned (name and money)
    )
}

function updatePortfolio() {
    // push portfolio[] through websocket to update subscriptions
    // websocket connection will update the dom
}

function searchStock() {
    // ajax get call that runs IEX api call
    $.ajax({
        method: "GET",
        url: "/api/...:" + symbol
    }).then((res) => {
        // updates dom with return info
    })

}

purchase_price = Number($("#pricePurchased").val());
stockQuantity = Number($("#stockQuantity").val());
const id = 1
symbol = $("#buySymbol").val();

const calcAmount = function (purchase_price, stockQuantity) {
    purchase_price = Number($("#pricePurchased").val());
    stockQuantity = Number($("#stockQuantity").val());
    return (purchase_price * stockQuantity)
}


function buyStock(symbol) {

    var searchKey = symbol.trim().toUpperCase();
    var queryURL = "https://api.iextrading.com/1.0/tops/last?symbols=" + searchKey.replace(/ /g, '');
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (data) {    
        console.log(data[0]["price"]);
        if (data[0]["price"] === undefined) {
            $("#error").prepend("!error, that is not a valid stock symbol!");
            return
        } else {
            var price = data[0]["price"]
            $("#pricePurchased").val(price);
        }
    });
};

function confirmBuy() {
    purchase_price = Number($("#pricePurchased").val());
    stockQuantity = Number($("#stockQuantity").val());
    const id = $("#user_email").data("id");
    symbol = $("#buySymbol").val().toUpperCase();
    $.ajax({
        url: `/api/buy/${id}&${symbol}&${purchase_price}&${stockQuantity}`,
        method: "POST"
    }).done(function (result) {
        console.log(result);
    })
}

window.onkeyup = function (event) {
    // const keyCode = event.keyCode;
    if (event.keyCode === 9) {
        buyStock($("#buySymbol").val())
        $("#calcTotal").val(`$${calcAmount()}`)
    }
};

$(document).on("click", "#confirmBuy", function () {
    confirmBuy();
    location.reload();
});

// function PresTab(e)
// {
//     var keycode = (window.event) ? event.keyCode : e.keyCode;
//     if (keycode == 9)
//     alert('tab key pressed');
// }

// $("#stockQuantity").on(function(event) {

//     if (event.keyCode === 13) 
//         console.log(calcAmount(5,5));


// });

function sellStock(symbol) {
    // remove stock from stocks[]
    let spliceIndex = stocks.indexOf(symbol);
    stocks.splice(spliceIndex, 1);
    // Ajax call to return the current price of the stock
    //$.
    // do math to add revenue back to user money 
    // update DOM
    updatePortfolio(stocks)
}
