var express = require('express');
var router = express.Router();
var pool = require('./api/pool');

router.post('/adduser',(req,res)=>{

    const body = req.body;
    console.log('bodyyyyy',body);
    
    const qry = `insert into user_register set ?`

    pool.query(qry,body,(err,result)=>{
      if(err)
      {     console.log(err)
          return res.status(400).json([])
      }  
      else
      {
        return res.status(200).json(result)
      }
    })
})

router.get('/display',(req,res)=>{
    pool.query('select * from user_register',(err,result)=>{

        if(err)
        {   console.log(err)
            return res.status(400).json([])
        }
        else
        {
            return res.status(200).json(result)
        }
    })
})

router.post('/update',(req,res)=>{
    console.log('body',req.body);

    pool.query('update user_register set username=?, email=?,password=?,confirm_password=?,phone=? where user_register_id=?',[req.body.username,req.body.email,req.body.password,req.body.confirm_password,req.body.phone,req.body.user_register_id],(err,result)=>{
        if(err)
        {
            console.log(err)
            return res.status(400).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
})


router.post('/displaybyid',(req,res)=>{
    console.log('body',req.body);

    pool.query('select * from user_register where user_register_id=?',[req.body.user_register_id],(err,result)=>{
        if(err)
        {
            console.log(err)
            return res.status(400).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
})

router.post('/delete',(req,res)=>{
    pool.query('delete from user_register where user_register_id=?',[req.body.user_register_id],(err,result)=>{
        if(err){
            return res.status(400).json({status:false,err})
        }
        else
        {
            return res.status(200).json({status:true,result})
        } 
    })
})


router.post('/checklogin',function(req,res)
{ console.log(req.body)
pool.query("select * from user_register where phone=?",[req.body.phone],function(err,result){
if(err){
  console.log(err)
 return res.status(500).json([])
}
else
{  
  if(result[0])
  {
     return res.status(200).json({status:true, message:'User Already exist',result:result[0]})
  }
  else
  {
      return res.status(200).json({status:true, message:'New Customer'})}  
}

})})


module.exports = router;
