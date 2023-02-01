const express = require('express')
const router = express.Router()

const searchIngredients = require('../controllers/ingredientSearchController')

router.get('/ingredients', searchIngredients)

module.exports = router