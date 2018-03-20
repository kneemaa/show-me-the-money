
const socket = require("socket.io");

const server = require("./server.js")
console.log("server " + server);
// socket setup, this connects the server to the clients

const io = socket(server);
// all clients IEX socket
const IEXsocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')

module.exports = app => {
// listens for a "connection" event, and runs the callback with 
// the socket paramater. This establishes a socet connection btween
// the server and THAT specific client
io.on("connection", function(socket){
    console.log("Made socket connection ", + socket.id);

    // sets up a user specific IEX connection
    const iex = require("socket.io-client")("https://ws-api.iextrading.com/1.0/tops")
    
    // listens for a "loggedin" event from the client
    // with the user info
    socket.on("loggedin", (user) => {

        //creates variables for id and stocks from the user data sent
        const {id, stocks} = user;

        // receives a message from IEX with the users stocks data
        // and then sends it back to just the specific client
        iex.on('message', message => {
            let data= JSON.parse(message)
            let symbol = data.symbol;
            let lastPrice = data.lastSalePrice;
            console.log("Symbol: " + symbol + ", Price: " + lastPrice)
            socket.emit("portfolio", {description: "price " + lastPrice});
        })

        // connect to the IEX channel and subscribe to the stocks from user
        iex.on("connect", () => {
            iex.emit("subscribe", stocks.join(",")) 

            // below was hard coded practice data 
            // var newData = {
            //     stocks,
            //     money: stocks.length * 100
            // }

            // setInterval(() => {
            //     socket.emit("newData", newData)
            // }, 3000);            
        })

        // iex.on("message", message => {
        //     console.log(message)
        //     // process data and send back to user on each update from IEX
        //     socket.emit("newData", 'some stock data here')
        // })

    })

    // closes BOTH sockets on client disconnect
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
})

// Broad channel IEX socket to receive and broadcast "Top 10"
// listens for a message about our hard-coded subscriptions 
// and broadcasts it out to ALL connected clients
// Listen to the channel's messages
IEXsocket.on('message', message => {
    let data= JSON.parse(message)
    let symbol = data.symbol;
    let lastPrice = data.lastSalePrice;
    console.log("Symbol: " + symbol + ", Price: " + lastPrice)
    io.sockets.emit("broadcast", {description: "price " + lastPrice});
})

// Connect to the channel
IEXsocket.on('connect', () => {

// Subscribe to topics (i.e. appl,fb,aig+)
IEXsocket.emit('subscribe', 'snap,fb,aig')


})

// Disconnect from the channel
IEXsocket.on('disconnect', () => console.log('Disconnected.'))

}