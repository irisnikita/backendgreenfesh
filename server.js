//libaries
const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 6789;

const app=express();

//connect to database
const connMysql = mysql.createConnection({
    host: 'remotemysql.com',
    user: '2xlWAvJ2Sv',
    password: '4Kb66IhUh6',
    database: '2xlWAvJ2Sv'
});

connMysql.connect(err=>{
    (err)?console.log(err):console.log('Connect success !');
});

require('./routes/staffRouter')(app,connMysql);

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
});

