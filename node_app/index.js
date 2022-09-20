const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const server = require('http').createServer(app);


const node_library = require('./library')
const config = require('./config')
const routes = require('./routes')
console.log(routes,'routes')

try {
    app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
extended: true,
limit: '50mb',
}));
app.use(express.static('public'));
app.use('/',express.static('public'));

node_library.map(lib => require(`./library/${lib}`)(app))
config.map(conf => require(`./config/${conf}`))
const route_arr = routes.map(route => require(`./routes/${route}`))
app.use("/api", route_arr);

} catch (error) {
    console.log('error in index:',error.message)
    console.log('error in index:',error)
}

