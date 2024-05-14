require('dotenv').config()
const mongoose = require('mongoose')
const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.DBURL)
        console.log('connected to db')
    } catch (error) {
      console.log(error.message);  
    }
}
module.exports={dbConnection}