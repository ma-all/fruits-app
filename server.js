const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"])

const dotenv = require('dotenv').config() //makes .env file avaiable
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

//connect to mongoDB using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

app.use(morgan('dev'))

app.get('/', async (req, res)=>{
    res.render('home.ejs')
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
    // console.log(process.env.MONGODB_URI)
})