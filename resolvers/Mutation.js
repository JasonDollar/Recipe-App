const jwt = require('jsonwebtoken')

const Recipe = require('../models/Recipe')
// const User = require('../models/User')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {
  Mutation: {
    async addRecipe(parent, {
      name, description, category, instructions, username, 
    }, ctx) {
      const newRecipe = await Recipe.create({
        name, description, category, instructions, username,
      })
      return newRecipe
    },
    async signUpUser(parent, { username, email, password }, { User }) {
      const user = await User.findOne({ username })
      if (user) {
        throw new Error('User already exists')
      }
      const newUser = await User.create({ username, email, password })
      return {
        token: createToken(newUser, process.env.JWT_SECRET, '10days'),
      }
    },
  },
}