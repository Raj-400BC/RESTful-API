import express, { Router } from 'express';

const router = express.Router();

router.get('/' , (req,res,next)=>{
    res.status(200).json({
        message : "Handling the GET reqs to the products"
    })
})

router.post('/' , (req,res,next)=>{
    res.status(200).json({
        message : "Handling the POST reqs to the products"
    })
})
router.get('/:productID' , (req,res,next)=>{
    const id = req.params.productID;
    if(id==='special'){
        res.status(200).json({
            message : "Personal Discount",
            ID : id
        })
    }
    else{
        res.status(200).json({
            message : "provided invalid id"
        })
    }
    
})

router.patch('/' , (req,res,next)=>{
    res.status(200).json({
        message : "Handling the PATCH reqs to the products"
    })
})

router.delete('/' , (req,res,next)=>{
    res.status(200).json({
        message : "Handling the DELETE reqs to the products"
    })
})

export default router