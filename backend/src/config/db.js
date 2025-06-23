const mongoose = require("mongoose")

const mondbUrl = process.env.MONGODB_URL

const connectDb = () =>{
    console.log('connecting to server')
    return mongoose.connect(mondbUrl)
}

module.exports = {connectDb}
