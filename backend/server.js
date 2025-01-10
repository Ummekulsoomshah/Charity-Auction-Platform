const http=require('http')
const app=require('./app')
const {Server}=require('socket.io')
const server=http.createServer(app)
const cors = require("cors");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your React app's URL
      methods: ["GET", "POST"],
    },
  });
module.exports=io
server.listen(3000)