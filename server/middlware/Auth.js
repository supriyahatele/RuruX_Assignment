require('dotenv').config();
const jwt = require('jsonwebtoken');

const { studentModel } = require('../models.js/studentModel');
const auth = (req, res, next) => { 
    const token = req.headers.authorization?.split(" ")[1];
    if(token) {
        jwt.verify(token,process.env.SECRETKEY, async(err, decoded) => {
            if(err){
                return res.status(401).json({message : 'invalid token or token expired'})
            }else{

                const role = decoded.role
                // const user = await studentModel.findById({_id:decoded.id});
                req.role = role;
                req.id = decoded.id;
                // req.user =  user.username;
                next();
            }
        })
    }else{
        res.status(404).json({message : 'your are not authorized.please login'})
    }
}

module.exports = {
    auth
}