const bodyParser = require('body-parser');

module.exports = function(app,connMysql){
    app.use(bodyParser.json());

    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        next();
    });

    //getListStaff
    app.get('/listStaff/',(req,res)=>{
        connMysql.query(`SELECT * FROM staffs `,(err,data)=>{
            if(err){
                res.send(err)
            }
            else
            res.send(data)
        })
    })
    
}