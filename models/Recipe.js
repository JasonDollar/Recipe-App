const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A recipe must have a name'],
  },
  category: {
    type: String,
    required: [true, 'A recipe must have a category'],
  },
  description: {
    type: String,
    required: [true, 'A recipe must have a description'],
  },
  instructions: {
    type: String,
    required: [true, 'A recipe must have instructions'],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
})

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe