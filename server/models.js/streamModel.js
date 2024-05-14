
const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
    name: { type:String,required:true}
});
const streamModel=mongoose.model('stream',StreamSchema)
module.exports={streamModel}