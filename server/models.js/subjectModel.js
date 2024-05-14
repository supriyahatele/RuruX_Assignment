


const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: { type:String,required:true},
    streams: { type:mongoose.Schema.Types.ObjectId, ref: 'stream' ,required:true}
});

const subjectModel=mongoose.model('subject',subjectSchema)
module.exports={subjectModel}