const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/liveauctiondb')


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    bid: {
        type: String,
        required: true,
        trim: true
    },
    bidder: {
        type: String,

        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Item', itemSchema)