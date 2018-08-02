const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const router = require('')
const request = require('request');

const server = express();
const port = 8000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../')));

server.get('./bundle.js/:3002', (req, res) => {
    request('http://localhost:3002/bundle.js', (err, response, body) => {
        res.status(200).send(body);
    })
})

server.use('/api/simexp', (req, res) => {
    request('http://localhost:3002/events', function(error, response, body) {
        if(response.statusCode === 200) {
            res.status(200).send(body);
        }
    })
})

server.listen(port, () => {
    console.log('Server is running on port ', port);
})
