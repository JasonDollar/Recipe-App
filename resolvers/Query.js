const Recipe = require('../models/Recipe')

module.exports = {
  Query: {

    async getAllRecipes(_, args, ctx) {
      const allRecipes = await Recipe.find()
      return allRecipes
    },
  },
}