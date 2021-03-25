var express = require('express');
var router = express.Router();
var pool = require('./api/pool');
var upload = require('./api/multer');


router.post('/addgame',upload.single('poster'),(req,res)=>{
    // console.log(req.body)
   
    const body = req.body;
    body.poster = req.file.filename; 
    console.log(req.body)
    const qry = `insert into games set ?`
    pool.query(qry, body, (err,result)=>{
        if(err){
            console.log(err);
            
            return res.status(400).json({status:false,err})
        }
        else
        {
            // console.log(result);
            
            return res.status(200).json({result})
        } 
    })
})

router.get('/display',(req,res)=>{
    pool.query('select * from games',(err,result)=>{
        if(err)
        {
          return  res.status(400).json([])
        }
        else
        {
            return  res.status(200).json(result)
        }
    })
})

router.post('/update',(req,res)=>{
pool.query('update games set console_type_id=? , name=? , poster=? , price=? , description=? , stock=? , rented=? where gameid=?',[req.body.gameid],(err,result)=>{
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

router.post('/delete',(req,res)=>{
    pool.query('delete from games where gameid=?',[req.body.gameid],(err,result)=>{
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

router.post('/displaybyid',(req,res)=>{
    console.log('req.body',req.body);
    
    pool.query('select * from games where productid=?',[req.body.productid],(err,result)=>{
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

router.post('/displaybyid',(req,res)=>{
    pool.query('select * from games where productid=?',[req.body.productid],(err,result)=>{
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


module.exports = router;