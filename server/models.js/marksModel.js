
const mongoose = require('mongoose');
const marksSchema = new mongoose.Schema({
    studentName: { type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true },
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'stream',required:true },
    subjects: { type: mongoose.Schema.Types.ObjectId, ref: 'subject',required:true },
    marks: { type:Number ,required:true}
});

const marksModel=mongoose.model('mark',marksSchema)
module.exports={marksModel}