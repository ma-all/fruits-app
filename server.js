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

//require it so we can use it on the server
const Fruit = require('./models/fruit.js')

app.use(morgan('dev'))

app.get('/', async (req, res)=>{
    res.render('home.ejs')
})

//this route will change often
app.get('/fruits', async (req, res) => {
    //create a fruit object
    const fruitData = {}
    fruitData.name = 'Blueberry'
    fruitData.isReadyToEat = false
    
    //use a mongoose method to add it to the db
    let createdFruit = await Fruit.create(fruitData) //returns new fruit doc

    //view the created fruit
    res.send(createdFruit)
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
    // console.log(process.env.MONGODB_URI)
})

// Code Graveyard ===========
// const fruitData = {}
//     fruitData.name = 'Blueberry'
//     fruitData.isReadyToEat = false
    
//     //use a mongoose method to add it to the db
//     let createdFruit = await Fruit.create(fruitData) //returns new fruit doc