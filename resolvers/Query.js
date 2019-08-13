

module.exports = {
  Query: {

    async getAllRecipes(parent, args, { Recipe }) {
      const allRecipes = await Recipe.find().sort({
        createdDate: 'desc',
      })
      return allRecipes
    },
    async getCurrentUser(parent, args, { request, User }) {
      if (!request.currentUser) return null

      const user = await User.findOne({ username: request.currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Recipe',
        })

      if (!user) {
        throw new Error('No user found')
      }

      return user
    },
    async getRecipe(parent, { id }, { Recipe }, info) {
      const recipe = await Recipe.findOne({ _id: id })
      if (!recipe) throw new Error('No recipe found!')
      return recipe
    },
  },
}