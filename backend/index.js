import { port } from "./config/environment/index.js"
import { connectDB } from "./db/index.js"
import { setupDatabase } from "./db/schemas/schemas.js"
import app from "./app.js"

const start = async () => {
    try {
        console.log('Connecting to database');
        await connectDB();

        console.log('Setting up database schema');
        await setupDatabase();

        await app.listen(port)
        console.log(`graphql server running at port: ${port}`)
    }
    catch (error){
        console.error('failed: ', error)
    }
}

start()