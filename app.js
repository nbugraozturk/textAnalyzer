const http = require('http');
const hostName = "127.0.0.1";
const port = 8080;

const app = require('./route');

app.listen(port, hostName, () => {
    console.log('Started');
});