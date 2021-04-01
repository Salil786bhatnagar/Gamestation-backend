var express = require('express');
var router = express.Router();
var pool = require('./api/pool');
var upload = require('./api/multer');


router.post('/addproduct',upload.single('image'),(req,res)=>{
    // console.log(req.body)
   
    const body = req.body;
    body.image = req.file.filename; 
    console.log(req.body)
    const qry = `insert into console_product set ?`
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
    pool.query('select * from console_product',(err,result)=>{
        if(err){
            return res.status(400).json({status:false,err})
        }
        else
        {
            return res.status(200).json({status:true,result})
        } 
    })
})


router.post('/update/:productid',upload.single('image'),(req,res)=>{
    // console.log(req.body);
    // console.log(req.params)
    // console.log(req.file);
    
    
    if(req.body.image !=''){
     qry = 'update console_product set console_type_id=?, productname=?, model=?, price=?, offer=?, offer_type=?, rented=?, stock=?, description=?, image=? where productid=?' ;
     para = [req.body.console_type_id, req.body.productname, req.body.model, req.body.price,req.body.offer, req.body.offer_type,req.body.rented,req.body.stock, req.body.description,req.file.filename,req.params.productid]
    }
    else{
        qry = 'update console_product set console_type_id=?, productname=?, model=?, price=?, offer=?, offer_type=?, rented=?, stock=?, description=? where productid=?';

         para = [req.body.console_type_id, req.body.productname, req.body.model, req.body.price,req.body.offer, req.body.offer_type,req.body.rented,req.body.stock, req.body.description,req.params.productid]
    }


    // const body = req.body ;
    // body.image = req.file.filename ;
    // body.console_product_id = req.params.id ;

    pool.query(qry , para,(err,result)=>{
        if(err){
            console.log(err);
            
            return res.status(400).json({status:false,err})
        }
        else
        {
            return res.status(200).json({status:true,result})
        } 
    })
})


router.delete('/delete/:productid',(req,res)=>{
    pool.query('delete from console_product where productid=?',[req.params.productid],(err,result)=>{
        if(err){
            return res.status(400).json({status:false,err})
        }
        else
        {
            return res.status(200).json({status:true,result})
        } 
    })
})

router.post('/displaybyid',(req,res)=>{
    console.log('body',req.body);
    
    pool.query('select * from console_product where console_type_id=? order by console_type_id desc',[req.body.console_type_id],(err,result)=>{
        if(err){
            console.log(err);
            
            return res.status(400).json({status:false,err})
        }
        else
        {
            return res.status(200).json({status:true,result})
        } 
    })
})




module.exports = router ;