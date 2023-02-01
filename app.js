require('dotenv').config()
//const axios = require("axios");
const morgan = require("morgan");
const apicache = require("apicache");
const express = require('express')

const app = express()

app.use(morgan('dev'))

let cache = apicache.middleware

app.use(cache('5 minutes'))

// router imports
const searchRouter = require('./routes/searchRouter')

app.use('/api/v1/search/', searchRouter)


app.get('/', (req, res) => {
    res.send('<h1>Ingredient Search</h1>')
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})




