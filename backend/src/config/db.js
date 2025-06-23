const mongoose = require("mongoose")

const mondbUrl = process.env.MONGODB_URL || "mongodb+srv://sagargupta028:Sagar@9097@cluster0.tpyfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = () =>{
    console.log('connecting to server')
    return mongoose.connect(mondbUrl)
}

module.exports = {connectDb}