require('dotenv').config()
const axios = require("axios");
const morgan = require("morgan");
const apicache = require("apicache");
const express = require('express')

const app = express()

app.use(morgan('dev'))

let cache = apicache.middleware

app.use(cache('5 minutes'))

app.get('/ingredients', (req, res) => {

    const getFoodData = async (term) => {

        const options = {
            method: 'GET',
            url: process.env.URL,
            params: {ingr: term},
            headers: {
              'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
              'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
            }
          };
        
        
        const searchResults = axios.request(options).then(function (response) {
            const data = []
            foodData = response.data.hints
            for (let i = 0; i < 5; i++) {
                const {food} = response.data.hints[i]
                data.push(food)
            }
            //console.log(data)
            return data
        }).catch(function (error) {
            console.error(error);
        });
    
        foodData = await searchResults
        console.log(foodData);
    }

    const searchTerm = 'Cream Cheese'
    getFoodData(searchTerm)
    
})

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})
// const getFoodData = async (term) => {

//     const options = {
//         method: 'GET',
//         url: process.env.URL,
//         params: {ingr: term},
//         headers: {
//           'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
//           'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
//         }
//       };
    
    
//     const searchResults = axios.request(options).then(function (response) {
//         const data = []
//         foodData = response.data.hints
//         for (let i = 0; i < 5; i++) {
//             const {food} = response.data.hints[i]
//             data.push(food)
//         }
//         //console.log(data)
//         return data
//     }).catch(function (error) {
//         console.error(error);
//     });

//     foodData = await searchResults
//     console.log(foodData);
// }

// const searchTerm = 'Cream Cheese'

// getFoodData(searchTerm)




