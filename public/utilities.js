
function createNewUser() {
    // Ajax post to create user in db
    $.ajax({
        method: "POST",
        url: "/api/...:" + userEmail
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
    var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + searchKey.replace(/ /g, '') + '&interval=1min&apikey=GNC3G50UKYCQIXVN';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (data) {
        console.log(data);
        if (data['Meta Data'] === undefined) {
            console.log("!error");
            $('#search-keyword').html(searchKey + ' - No stock found. Please enter a correct symbol');
            $('#search-result tbody').html('');
            $('#search-result table').addClass('show-hide');
        } else {
            var price = data["Time Series (1min)"]["2018-03-23 14:21:00"]["4. close"];
            console.log(price);
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
        console.log("bananas")
        $("#calcTotal").val(`$${calcAmount()}`)
        console.log(calcAmount());
    }
};

$(document).on("click", "#confirmBuy", function () {
    console.log("BANAANS");
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
    console.log(stocks);
    // Ajax call to return the current price of the stock
    //$.
    // do math to add revenue back to user money 
    // update DOM
    updatePortfolio(stocks)
}
