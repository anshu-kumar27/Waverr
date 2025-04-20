const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' })
const app = require('./app')
const connectDatabase = require('./config/database')

// handling uncaught exception


process.on("uncaughtException", (err) => {
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception error`);
    process.exit(1);
})


//conncting to the database
connectDatabase()

const PORT = process?.env?.PORT ?? 8080;
const server = app.listen(PORT, () => {
    console.log(`server is working on http://localhost:${PORT}`)
})


//unhandled promise rejection 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });

})
