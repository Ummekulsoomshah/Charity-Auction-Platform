const http=require('http')
const app=require('./app')
const itemModel=require('./models/auctionItem.model')
const {Server}=require('socket.io')
const server=http.createServer(app)
const cors = require("cors");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your React app's URL
      methods: ["GET", "POST"],
    },
  });

 io.on('connection',(socket)=>{
    console.log('New connection')
  
    socket.on('currentBid',(auctions)=>{
        // console.log(auctions)
        // io.emit('currentBid',auctions)
    })
    socket.on('placeBid', async (bidData) => {
      const { id, bid, bidder } = bidData;
      // console.log('bidData',bidData)
      try {
        const auction = await itemModel.findOne({_id:id});
        console.log('auction',auction)
        // console.log('bid',bid)

        // console.log('auctionbid',auction.bid)
        // console.log(bid > auction.bid)
        console.log(Number(bid) > Number(auction.bid))
        if (auction && Number(bid) > Number(auction.bid)) {
          // console.log("bid",bid)
          console.log('auction.bid',auction.bid)
          auction.bid = bid;
          auction.bidder = bidder;
          auction.timestamp=Date.now()
          await auction.save();
          // console.log('auction',auction)
          io.emit('updateBid', auction);
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('updateRequiredAmount', (amount) => {
      console.log('Required amount updated:', amount);
      io.emit('updateRequiredAmount', amount); // Broadcast the update to all clients
    });

    // socket.on('amountset',localStorage.getItem('amount'))
})
// module.exports=io
server.listen(3000)