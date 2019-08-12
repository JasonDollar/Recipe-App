const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const Recipe = require('../models/Recipe')
// const User = require('../models/User')

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user
  return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {
  Mutation: {
    async addRecipe(parent, {
      name, description, category, instructions, username, 
    }, { Recipe }) {
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
    async signInUser(parent, { username, password }, { User }) {
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User not found')
      }
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }
      return {
        token: createToken(user, process.env.JWT_SECRET, '10days'),
      }
    },
  },
}