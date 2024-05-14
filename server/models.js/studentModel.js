const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name:{type:"string", required:true},
    email:{type:"string" , required:true},
    password:{type:"string" , required:true},
    stream : { type: mongoose.Schema.Types.ObjectId, required:true, ref: "stream" },
 	subject : { type: [mongoose.Schema.Types.ObjectId], required:true, ref: "subject" },
    role:{type:"string",enum:["student","admin"],default:"student"}
},{timestamps:true})
const userModel=mongoose.model('user',userSchema)
module.exports={userModel}
