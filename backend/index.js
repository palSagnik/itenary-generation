import { port } from "./config/environment/index.js"
import { connectDB } from "./db/index.js"
import app from "./app.js"

const start = async () => {
    try {
        console.log('Connecting to database');
        await connectDB();
        console.log('Connected to database');

        await app.listen(port)
        console.log(`graphql server running at port: ${port}`)
    }
    catch (error){
        console.error('failed to start graphql server: ', error)
    }
}

start()