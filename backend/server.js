// env setup
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' })
const connectDatabase = require('./config/database')

//conncting to the database
connectDatabase()

const {server}  = require('./config/socket')

// handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception error`);
    process.exit(1);
})




const PORT = process?.env?.PORT ?? 8080;
server.listen(PORT, () => {
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
