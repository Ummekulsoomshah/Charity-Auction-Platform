const dotenv = require('dotenv').config();

const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const itemModel = require('./models/auctionItem.model')
const { Server } = require('socket.io')
const cors = require("cors");

const server = http.createServer(app)
//console.log(process.env)
mongoose.connect(process.env.MONGO_URI);
const io = new Server(server, {
  cors: {
    origin: "https://charity-auction-platform.vercel.app/", // Replace with your React app's URL
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  //console.log('New connection')

  socket.on('placeBid', async (bidData) => {
    const { id, bid, bidder } = bidData;
    try {
      const auction = await itemModel.findOne({ _id: id });
      if (auction && Number(bid) > Number(auction.bid)) {
        auction.bid = bid;
        auction.bidder = bidder;
        auction.timestamp = Date.now()
        await auction.save();
        io.emit('updateBid', auction);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('updateRequiredAmount', (amount) => {
    io.emit('updateRequiredAmount', amount); // Broadcast the update to all clients
  });

})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}`);
});