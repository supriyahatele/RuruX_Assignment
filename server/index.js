const express = require('express')
const { dbConnection } = require('./config.js/dbConnection')
const { studentRouter } = require('./routes.js/studentRoute')
const { streamRouter } = require('./routes.js/streamRouter')
const { subjectRouter } = require('./routes.js/subjectRouter')
const { marksRouter } = require('./routes.js/marksRouter')

require('dotenv').config()
const app = express()

app.use(express.json())
 app.get('/',(req,res)=>{
    res.send("Welcome")
 })

app.use('/students',studentRouter)
app.use('/stream',streamRouter)
app.use('/subject',subjectRouter)
app.use('/marks',marksRouter)

app.listen(process.env.PORT,async()=>{
    await dbConnection()
    console.log('server is running ')
})