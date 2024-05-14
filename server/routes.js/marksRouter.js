const express = require('express');
const { createMarks, updateMarks, deleteMarks, getAllMarks } = require('../controllers.js/marksController');
const { auth } = require('../middlware/Auth');
const { access } = require('../middlware/authorization');


const marksRouter = express.Router();
//admin

marksRouter.post('/addMarks',auth,access('admin'),createMarks)

marksRouter.get('/performance/:id',auth,access('student'),getAllMarks)
marksRouter.patch('/updateMarks/:id',auth,access('admin'),updateMarks)

marksRouter.delete('/deleteMarks/:id',auth,access('admin'),deleteMarks)



module.exports = {marksRouter}