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

//if we want to see the form data
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'))

app.get('/', async (req, res)=>{
    res.render('home.ejs')
})

//this route will change often
//GET /fruits/new (form for creating fruit)
app.get('/fruits/new', async (req, res) => {
    res.render('new.ejs')
})

//POST /fruits (creates fruit in database)
app.post('/fruits', async (req, res) => {
    const fruitData = {}
    fruitData.name = req.body.name
    
    if (req.body.isReadyToEat === 'on'){
        fruitData.isReadyToEat = true
    } else {
        fruitData.isReadyToEat = false
    }
    
    let createdFruit = await Fruit.create(fruitData) 
    res.send(createdFruit)
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
    // console.log(process.env.MONGODB_URI)
})

// Code Graveyard ===========
//Create Fruits
// const fruitData = {}
//     fruitData.name = 'Blueberry'
//     fruitData.isReadyToEat = false
    
//     //use a mongoose method to add it to the db
//     let createdFruit = await Fruit.create(fruitData) //returns new fruit doc

//Find Fruits
// //use a mongoose method to find all the fruits
// let allFruits = await Fruit.find()

//Find a specific fruit (case sensitive, it should be exactly as it is)
// //use a mongoose method to find all the bananas
//  let allBananas = await Fruit.find({name: 'Banana'}) 

// //use a mongoose method to find fruits that are not ready
// let notReady = await Fruit.find({isReadyToEat: false}) 

//use a mongoose method to find and change a fruit, {exisitng fruit}, {updated fruit}, 
    // let updatedFruit = await Fruit.findOneAndUpdate({name: 'Mango'}, {name: 'Pineapple'}, {new: true})

    //use a mongoose method to find and change a fruit by its id, {exisitng fruit}, {updated fruit}, 
    // let updatedFruit = await Fruit.findByIdAndUpdate('6a4f6c5198b555f1ba333408', {name: 'Green Apple'}, {new: true})
    // let updatedFruit = await Fruit.findByIdAndUpdate('6a4f6c5198b555f1ba333408', {isReadyToEat: 'false'}, {new: true})

    // let deletedFruit = await Fruit.findByIdAndDelete('6a4f6c5198b555f1ba333408', {isReadyToEat: 'false'}, {new: true})
    // let deletedFruit = await Fruit.findById('6a4f6c5198b555f1ba333408', {isReadyToEat: 'false'}, {new: true})

    // res.send(req.body) //submits the fruit in the db
    // res.send(req.body.name) //just shows the name of the fruit

    // const fruitData = {}
    // fruitData.name = req.body.name
    // fruitData.isReadyToEat

    // res.send(req.body.name)