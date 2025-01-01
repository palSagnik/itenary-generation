import { port } from "./config/environment"
import app from "./app"

const start = async () => {
    try {
        await app.listen(port)
        console.log(`graphql server running at port: ${port}`)
    }
    catch {
        console.log("failed to start graphql server")
    }
}

start()