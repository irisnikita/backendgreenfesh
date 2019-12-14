//libaries
const express = require('express');
const mysql = require('mysql');

const PORT = process.env.PORT || 6789;

const app = express();

//connect to database
const connMysql = mysql.createConnection({
    host: '35.225.6.209',
    user: 'truongvi1999',
    password: 'tjmwjm824594',
    database: 'greenfeshdata',
});

connMysql.connect(err => {
    err ? console.log(err) : console.log('Connect success !');
});

require('./routes/staffRouter')(app, connMysql);

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
