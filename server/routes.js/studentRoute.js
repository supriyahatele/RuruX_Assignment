const express = require('express');
const { register, login, getStudentById, getAllStudents } = require('../controllers.js/studentController');

const { access } = require('../middlware/authorization');
const { auth } = require('../middlware/Auth');

const studentRouter = express.Router();

studentRouter.get('/studentList',auth,access('admin'), getAllStudents)

studentRouter.post('/register',register)
studentRouter.post('/login',login)

studentRouter.get('/profile/:id',auth,access('student'),getStudentById)

module.exports = {studentRouter}