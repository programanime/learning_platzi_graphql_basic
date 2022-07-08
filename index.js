'use strict'
require("dotenv").config()
const cors = require("cors")
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require("fs");
const { join } = require("path");
const typeDefs = readFileSync(join(__dirname, "lib", "schema.graphql"), "utf-8")
const app = express()
const port = 3002
const resolvers  = require("./lib/resolvers")
// definiendo el esquema
const schema = makeExecutableSchema({typeDefs, resolvers})

// resolvers
app.use(cors())


app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
//   graphiql: true //client
  graphiql: true //client
}))



app.listen(3002,"0.0.0.0", () => {
  console.log('server is listening at 3002')
})