const express = require('express');

const { createSubject, updateSubject, deleteSubject } = require('../controllers.js/subjectController');
const { access } = require('../middlware/authorization');
const { auth } = require('../middlware/Auth');



const subjectRouter = express.Router();

subjectRouter.post('/addSubject',auth,access('admin'),createSubject)
subjectRouter.patch('/updateSubject/:id',access('admin'),updateSubject)
subjectRouter.delete('/deleteSubject/:id',access('admin'),deleteSubject)


module.exports = {subjectRouter}