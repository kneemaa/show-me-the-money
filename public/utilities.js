
function createNewUser() {
    // Ajax post to create user in db
    $.ajax({
        method: "POST",
        url: (window.location.origin || 'http://localhost:3000') + "/api/...:" + userEmail
    }).then(
        // update dom with user info returned (name and money)
    )
}

purchase_price = Number($("#pricePurchased").val());
stockQuantity = Number($("#stockQuantity").val());
symbol = $("#buySymbol").val();

function priceLookup(symbol) {

    const searchKey = symbol.trim().toUpperCase();
    const queryURL = "https://api.iextrading.com/1.0/tops/last?symbols=" + searchKey.replace(/ /g, '');

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (data) {
        if (data[0]["price"] === undefined) {
            $("#error").prepend("That may not be a valid stock symbol!");
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
        return result
    })
}

const calcAmount = function (purchase_price, stockQuantity) {
    purchase_price = Number($("#pricePurchased").val());
    stockQuantity = Number($("#stockQuantity").val());
    return (purchase_price * stockQuantity)
}

const calcBalance = function () {
    const availBal = $("#user_available").html();
    const formattedBal = availBal.replace(/^(.+?\.\d+).+/g, "$1").replace(/[^\d.]+/g, "");
    const debit = calcAmount()
    return Number(formattedBal - debit);
}

function updateBal() {
    const id = $("#user_email").data("id");
    const newBal = parseFloat(calcBalance()).toFixed(2);
    $("#user_available").html(`$${newBal}`);
    $.ajax({
        url: `api/balance/${id}&${newBal}`,
        method: "POST",
    }).done(function (result) {
        return result
    })
}

$(document).on("keyup click mouseup", function (event) {
    // const keyCode = event.keyCode;
    if (event.keyCode === 9 || event.keyCode === 13 || event.click) {
        priceLookup($("#buySymbol").val())
        $("#calcTotal").val(`$${calcAmount().toFixed(2)}`)
    }
});

$(document).on("click", "#confirmBuy", function () {
        confirmBuy();
        updateBal();
        location.reload();
});

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
