const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const router = require('')
const request = require('request');
const morgan = require('morgan');

const server = express();
const port = 8000;

server.use(morgan('dev'))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../')));


// get the bundles from everyone

server.get('./bundle.js/:3000', (req, res) => {
    request('http://localhost:3002/bundle.js', (err, response, body) => {
        res.status(200).send(body);
    })
})

server.get('./bundle.js/:3001', (req, res) => {
    request('http://localhost:3002/bundle.js', (err, response, body) => {
        res.status(200).send(body);
    })
})


server.get('./bundle.js/:3002', (req, res) => {
    request('http://localhost:3002/bundle.js', (err, response, body) => {
        res.status(200).send(body);
    })
})

server.get('./bundle.js/:3004', (req, res) => {
    request('http://localhost:3002/bundle.js', (err, response, body) => {
        res.status(200).send(body);
    })
})

//////////////////////////////////////
// api requests
/////////////////////////////////////

server .use('/api/simexp', (req, res)=> {
    request(`http://localhost:3001/api/simexp?starRating=5`, (error, response, body) => {
        if(response.statusCode === 200) {
            res.status(200).send(body);
        }
    })
});

server.use('/sidebar/:experience', (req, res)=>{
    request(`http://localhost:3000/sidebar/${req.params.experience}`, (error, response, body)=>{
        if(response.statusCode === 200){
            res.status(200).send(body);
        } 
    })
});

server.use('/events', (req, res)=> {
    request(`http://localhost:3002/events`, (error, response, body) => {
        res.status(200).send(body);
    })
});

server.use('/api/data', (req, res)=> {
    request(`http://localhost:3004/api/data`, (error, response, body) => {
        res.status(200).send(body);
    })
});
  
server.use('/api/data/all', (req, res)=> {
    request(`http://localhost:3004/api/data/all`, (error, response, body) => {
        res.status(200).send(body);
    })
});

server.listen(port, () => {
    console.log('Server is running on port ', port);
})



