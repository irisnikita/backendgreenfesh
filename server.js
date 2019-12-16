//libaries
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadImage = require('./helpers/helpers')
const cors = require('cors');

const PORT = process.env.PORT || 6789;


//cors middleware
app.use(cors())

app.use('/public',express.static(__dirname + '/public'))
//permison
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

//publicFolder
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/avatar')
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + '-' + file.originalname)
    }
})

//upload
var upload = multer({storage: storage}).single('file')

app.get('/',(req,res)=>{
    res.send("hello mọi người")
})

app.post('/upload',function(req,res){
    upload(req,res,function(err){
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
            
    })
})

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

app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`);
});
