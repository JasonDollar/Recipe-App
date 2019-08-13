const { GraphQLServer } = require('graphql-yoga')
const express = require('express')
require('dotenv').config({ path: './config.env' })
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const resolvers = require('./resolvers')
const User = require('./models/User')
const Recipe = require('./models/Recipe')

process.on('uncaughtException', err => {
  console.log('UNHANDLED EXCEPTION! Shutting down gracefully...')
  console.log(err)
  process.exit(1)
})


// const app = require('./app')

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`


mongoose.connect(process.env.MONGO_URI_DEV, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('db connected'))
  .catch(e => console.log('db error', e))

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context(request) {
    return {
      ...request,
      User,
      Recipe,
    }
  },
})

server.express.use(express.json())


server.express.use(async (req, res, next) => {
  // console.log(process.env.JWT_SECRET)
  const token = req.headers.authorization
  // console.log(token)
  if (token) {
    try {
      const parseJwtString = token.split(' ')[1]
      const currentUser = jwt.verify(parseJwtString, process.env.JWT_SECRET)
      req.currentUser = currentUser
    } catch (e) {
      console.log(e)
    }
  }
  next()
})

server.start({ port: process.env.PORT }, options => console.log('Server is running on localhost:' + options.port))

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down gracefully...')
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})