const { GraphQLServer } = require('graphql-yoga')
const express = require('express')
require('dotenv').config({ path: './config.env' })
const mongoose = require('mongoose')
const resolvers = require('./resolvers')
const User = require('./models/User')

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
      request,
      User,
    }
  },
})

server.express.use(express.json())

server.start({ port: process.env.PORT }, options => console.log('Server is running on localhost:' + options.port))

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down gracefully...')
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})