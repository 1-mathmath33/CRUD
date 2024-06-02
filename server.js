        // const http = require('http'); // will handle http requests
        // 
        // const server = http.createServer();
        // 
const http = require('http'); //to handle HTTP requests
const app = require('./app'); //imports the express application defined in app.js
const port = process.env.port || 3000;
 server = http.createServer(app); //requires a listener which sends a request to the server and recieves a response, here, the express app works as a listener
 server.listen(port);

 