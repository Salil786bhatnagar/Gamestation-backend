var express = require('express');
var router = express.Router();
var pool = require('./api/pool');
var upload = require('./api/multer');

router.post('/addAddress',(req,res)=>{

    const body = req.body;
    console.log('bodyyyyy',body);
    
    const qry = `insert into user_address set ?`

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



router.get('/displayAddress',(req,res)=>{
  pool.query('select * from  user_address ',(err,result)=>{
      if(err){
          return res.status(400).json({status:false,err})
      }
      else
      {
          return res.status(200).json({status:true,result})
      } 
  })
})



router.post('/displayAddressId',(req,res)=>{
  console.log('req.body',req.body);
  
  pool.query('select * from user_address where user_register_id=?',[req.body.user_register_id],(err,result)=>{
      if(err)
      {   console.log(err);    
        return  res.status(400).json([])
      }
      else
      {
          return  res.status(200).json(result)
      }
  })
})      

// update  delivery data //

router.post('/UpdateWhenDelivery',(req,res)=>{
  console.log('req.body',req.body);
  
  pool.query('update user_address set default_Add=? where user_address_id=?',[req.body.default_Add,req.body.user_address_id],(err,result)=>{
      if(err)
      {   console.log(err);    
        return  res.status(400).json([])
      }

      else
      {
        return  res.status(200).json(result)
      }
    })
  })


// router.delete('/delete/:console_type_id',(req,res)=>{
//   console.log(req.params);
//   pool.query('delete from console_type where console_type_id=?',[req.params.console_type_id],(err,result)=>{
//       if(err){
//           // console.log(err);
//           return res.status(400).json({status:false,err})
//       }
//       else
//       {
//           // console.log(result);
//           return res.status(200).json({status:true,result})
//       } 
//   })
// })





module.exports = router;