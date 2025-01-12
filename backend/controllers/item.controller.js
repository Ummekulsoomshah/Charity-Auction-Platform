const itemModel = require('../models/auctionItem.model')

module.exports.createItem = async (req, res, next) => {
    const { name, description, bid, bidder } = req.body
    try {
        const item = await itemModel.create({
            name, description, bid, bidder
        })
        res.status(201).json({
            item,
            message: 'item created'
        })
    } catch (err) {
        next(err)
    }
    

}

module.exports.itemList = async (req, res, next) => {
    try {
        const items = await itemModel.find()
        res.status(200).json({
            items
        })
    } catch (err) {
        next(err)
    }
}
module.exports.getTodayBids=async(req,res,next)=>{
    try {
        const startOfDay = new Date();
        console.log("startOfDay",startOfDay)
        startOfDay.setHours(0, 0, 0, 0);
        console.log("startOfDay.setHours(0, 0, 0, 0)",startOfDay.setHours(0, 0, 0, 0))

        const bids = await itemModel.find({
            timestamp: { $gte: startOfDay }
        });

        res.status(200).json({
            bids
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getTotalBids=async(req,res,next)=>{
    try {
        const bids = await itemModel.find();
        const totalBids = bids.reduce((total, item) => total + Number(item.bid), 0);
        res.status(200).json({
            totalBids
        });
    } catch (err) {
        next(err);
    }
}