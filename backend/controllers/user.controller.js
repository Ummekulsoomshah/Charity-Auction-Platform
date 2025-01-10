const userModel = require('../models/user.model')
// const db=require('../db/db.config')
const jwt = require('jsonwebtoken')
module.exports.register = async (req, res, next) => {
    const { name, email, password, role } = req.body
    try {
        //     const user = await db.query(
        //     'INSERT INTO User (name, email, password, role) VALUES (?,?,?,?)',[name, email, password, role]
        // )
        const user = userModel.create({
            name, email, password, role
        })
        const token = jwt.sign({ _id: user._id }, 'secret')
        res.status(200).json({
            message: 'User created successfully',
            user,
            token
        })
    } catch (err) {

        next(err);
    }

}

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user.email === email) {

            const token = jwt.sign({ _id: user._id, role: user.role }, 'secret')
            res.status(200).json({
                user,
                token
            })
        } else {
            res.status(401).json({
                message: "something went wrong"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports.dashboard = async (req, res, next) => {
    try {
        res.status(403).json({ message: 'user access denied',
            
         })
    } catch (err) {
        next(err)
    }
}