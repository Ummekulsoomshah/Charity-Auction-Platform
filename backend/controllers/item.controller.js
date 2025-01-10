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