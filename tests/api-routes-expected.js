const portfolio = [{
        "id": 1,
        "first_name": "Devin",
        "last_name": "Thomas",
        "email": "devin@gmail.com",
        "account_balance": 10000,
        "createdAt": "2018-03-22T00:17:42.000Z",
        "updatedAt": "2018-03-22T00:17:42.000Z",
        "Ledgers": [
            {
                "id": 1,
                "symbol": "TSLA",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 1
            },
            {
                "id": 5,
                "symbol": "FB",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 1
            },
            {
                "id": 11,
                "symbol": "SNAP",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 1
            },
            {
                "id": 14,
                "symbol": "MNKD",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 1
            }
        ]
    }]

const ledger = [
    {
        "id": 3,
        "first_name": "Daphne",
        "last_name": "Chen",
        "email": "daphne@gmail.com",
        "account_balance": 10000,
        "createdAt": "2018-03-22T00:17:42.000Z",
        "updatedAt": "2018-03-22T00:17:42.000Z",
        "Ledgers": [
            {
                "id": 3,
                "symbol": "TSLA",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 3
            },
            {
                "id": 7,
                "symbol": "FB",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 3
            },
            {
                "id": 10,
                "symbol": "SNAP",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 3
            },
            {
                "id": 12,
                "symbol": "FB",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 3
            },
            {
                "id": 13,
                "symbol": "SNAP",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 3
            },
            {
                "id": 15,
                "symbol": "SNAP",
                "purchase_price": 50,
                "stock_count": 5,
                "is_owned": true,
                "createdAt": "2018-03-22T00:17:42.000Z",
                "updatedAt": "2018-03-22T00:17:42.000Z",
                "UserId": 3
            }
        ]
    }
]

module.exports = {
	portfolio: portfolio,
	ledger: ledger,
}
