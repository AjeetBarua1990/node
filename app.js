const express = require('express');
const app = express('');
//const port = process.env.port || 3000;



const BodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const configData = require('./common/config.json');
let path =require('path');

const port = process.env.PORT || configData.REST_PORT;


var fs = require('fs');
var https = require("https");

const routeUser = require("./router/users");



app.use(BodyParser.json({ limit: "10mb" }));
app.use(BodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));

var imgDir = require('path').join(__dirname,'/images');
app.use( '/images', express.static( imgDir ) )
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});
  
app.set('view engine', 'html')

app.use('/user',routeUser);



app.listen(port,() =>{})
 console.log("Ok api is working");
;

app.get('/',(req,res)=>{
    res.send("welcome to mean project APi's for testing final version coming soon:)");
})