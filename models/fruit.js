const mongoose = require('mongoose')

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
})

//this method takes many arguments
const Fruit = mongoose.model('Fruit', fruitSchema)

//export so its available in other files
module.exports = Fruit