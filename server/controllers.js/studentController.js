
const bcrypt = require('bcrypt');
require('dotenv').config();
const { Types: { ObjectId } } = require('mongoose');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models.js/studentModel');
const { subjectModel } = require('../models.js/subjectModel');
const { streamModel } = require('../models.js/streamModel');
const saltRounds = 7;



const register = async (req, res) => {
    try{
       
        const {name,email,password ,stream,subject} = req.body;
        
        if(name&&email&&password &&stream&&subject){
            const checkEmail =await  userModel.findOne({email: email});
            
            if(checkEmail){
                return res.status(400).json({ message: 'you are already  registered ' });
            }
            const Stream = await streamModel.findOne({_id: stream});
            if(!Stream){
                return res.status(404).json({ message: 'Stream not found ' });
            }
            if (!Array.isArray(subject) || subject.length < 3) {
                return res.status(400).json({ message: 'Subject should be an array with at least 5 elements.' });
            }
            const invalidSubjects = [];
            for (const subjectId of subject) {
                const sub = await subjectModel.findById(subjectId);
                if (!sub) {
                    invalidSubjects.push(subjectId);
                }
            }
    
            if (invalidSubjects.length > 0) {
                return res.status(400).json({ message: `Invalid subjects: ${invalidSubjects.join(', ')}` });
            }
            bcrypt.hash(password,saltRounds, async(err, hash) => {
                if(err){
                    return res.status(500).json({error : err.message})
                }else{
                    const newUser = new userModel({...req.body,password:hash})
                    await newUser.save();
                    return res.status(201).json({message : 'user successfully registered'})
                }
            })
        }else{
           return  res.status(400).json({error : 'all fields are required'})
        }

    }catch(error){
      return  res.status(500).json({error : error.message})
    }
}

const login = async (req, res) => {
    try{
        const {email,password} = req.body
        const isStudent = await userModel.findOne({email:email});
        if(isStudent){
             bcrypt.compare(password,isStudent.password, (err, result) => {
                if(err){
                    return res.status(500).json({error : err})
                }else{
                    if(result){
                       
                        const accessToken = jwt.sign({id : isStudent._id, username:isStudent.username,role : isStudent.role}, process.env.SECRETKEY,{expiresIn :  '1h'})
                        const refreshToken = jwt.sign({id : isStudent._id, username:isStudent.username,role : isStudent.role}, process.env.SECRETKEY,{expiresIn : '1d'})
                        res.status(200).json({accessToken , refreshToken })
                    }else{
                        res.status(400).json({error : 'credential did not matched'})
                    }
                }
             })
        }else{
            res.status(404).json({msg : 'student not found'})
        }

    }catch(error){
        res.status(500).json({error : error.message})
    }
}




const getStudentById = async (req, res) => {
   
    try {
        console.log(req)
        const student = await userModel.findOne({ _id: req.params.id });
        if (!student) {
            return res.status(404).json({ msg: "student not found" })
        }
        const studentId = new ObjectId(req.id);
        if(studentId.equals(student._id)){
            return res.status(200).json({ studentData:student })
        }else{
            return res.status(403).json({ msg: "you cant get the the profile of other user" })  
        }
       
      
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const getAllStudents = async (req, res) => {
    
    try {
        const students = await userModel.find();
        return res.status(200).json({ msg: "users retrieved  successfully", data: students })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}
module.exports ={register,login,getStudentById,getAllStudents}