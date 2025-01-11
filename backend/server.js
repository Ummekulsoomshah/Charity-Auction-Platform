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
      try {
        const auction = await itemModel.findOne({_id:id});
        if (auction && bid > auction.bid) {
          auction.bid = bid;
          auction.bidder = bidder;
          await auction.save();
          io.emit('updateBid', auction);
        }
      } catch (error) {
        console.error(error);
      }
    });
})
// module.exports=io
server.listen(3000)