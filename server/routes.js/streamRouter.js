const express = require('express');
const { createStream, updateStream, deleteStream } = require('../controllers.js/streamController');
const { auth } = require('../middlware/Auth');
const { access } = require('../middlware/authorization');



const streamRouter = express.Router();

streamRouter.post('/addStream',auth,access('admin'), createStream)
streamRouter.patch('/updateStream/:id', auth,access('admin'),updateStream)
streamRouter.delete('/deleteStream/:id', auth,access('admin'),deleteStream)

module.exports = {streamRouter}