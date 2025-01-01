import { join } from "path"
import { readdirSync, readFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'

const graphqlFiles = readdirSync(__dirname, './typedefs')

let typeDefs = ''

graphqlFiles.forEach((file) => {
    typeDefs += readFileSync(join(__dirname, './typedefs', file), {
        encoding: 'utf-8',
    })
})

const schema = makeExecutableSchema(
    typeDefs, 
    // Pending schema
)

export default schema