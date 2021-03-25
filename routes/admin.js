var express = require('express');
var router = express.Router();
var pool = require('./api/pool');
var upload = require('./api/multer');

router.post('/checkLogin',(req,res)=>{
    pool.query('select * from adminlogin where email=? and password=?',[req.body.email , req.body.password],(err , result)=>{
        if(err)
        {
            return res.status(400).json([]);
        }
        else
        {
            if(result.length==1){
                
                return res.status(200).json(result)

            }
            else
            {
                return res.status(200).json([])

            }
        }
    })
})

module.exports = router ;