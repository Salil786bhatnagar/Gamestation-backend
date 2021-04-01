var express = require('express');
var router = express.Router();
var pool = require('./api/pool');
var upload = require('./api/multer');


router.post('/addtype',upload.single('image'),(req,res)=>{
    console.log(req.body);
    
    pool.query('insert into console_type(type,description,image) values(?,?,?)',[req.body.type, req.body.description, req.file.filename],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({err})
        }
        else
        {
            console.log(result);
            return res.status(200).json({result})
        } 
    })
})

router.get('/display',(req,res)=>{
    pool.query('select * from console_type',(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({status:false,err})
        }
        else
        {
             console.log(result);
            return res.status(200).json({status:true,result}    )
        } 
    })
})

router.delete('/delete/:console_type_id',(req,res)=>{
    // console.log(req.params);
    pool.query('delete from console_type where console_type_id=?',[req.params.console_type_id],(err,result)=>{
        if(err){
            // console.log(err);
            return res.status(400).json({status:false,err})
        }
        else
        {
            // console.log(result);
            return res.status(200).json({status:true,result})
        } 
    })
})


router.post('/update/:id',upload.single('image'),(req,res)=>{
    
    if (req.body.image != "") {
        qry =
          "update console_type set type=?,description=?,image=? where console_type_id=?";
        para = [
          req.body.type,
          req.body.description,
          req.file.filename,
          req.params.id
        ];
      }
      else{
        qry =
        "update console_type set type=?,description=? where console_type_id=?";
      para = [
        req.body.type,
        req.body.description,
        req.params.id
      ];
      }
      pool.query(qry, para, function (err, result) {
        if (err) {
            return res.status(400).json({status:false,err})
        } else {
            return res.status(200).json({status:true,result})
        }
      });
     }) 



module.exports = router;