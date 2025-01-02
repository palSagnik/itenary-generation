import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readdirSync, readFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolvers/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const graphqlFiles = readdirSync(join(__dirname, './typedefs'))

let typeDefs = ''

graphqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  })
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema