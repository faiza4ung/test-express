require('dotenv').config()
const jsonWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            message: 'token tidak ditemukan'
        })
    }

    const decode = jsonWT.verify(token, process.env.JWT_SECRET)
    req.id = decode.id
    next()
}