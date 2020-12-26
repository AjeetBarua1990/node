const express = require('express');
const app = express('');
const port = process.env.port || 3000;

app.listen(port,() =>{})
 console.log("Ok api is working");
;

app.get('/',(req,res)=>{
    res.send("Welcome to the home page of mean projecttt");
})