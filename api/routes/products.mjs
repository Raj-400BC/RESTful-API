import express, { Router } from 'express';
import mongoose from 'mongoose';
import Product from "../models/product.mjs";

const router = express.Router();

router.get('/' , (req,res,next)=>{
   Product.find()
   .exec()
   .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
   })
   .catch(err =>{
    console.log(err);
    res.status(500).json({
        error : err
    })
   })
})

router.post('/' , (req,res,next)=>{
  
    const product = new Product({
        _id  : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message : "Handling the POST reqs to the products",
            CreatedProduct : product
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    });

    
})
router.get('/:productID' , (req,res,next)=>{
    const id = req.params.productID;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("From database" + doc);
        if(doc){
        res.status(200).json(doc)
        }else{
            res.status(404).json({
                message: "No valid entry found for provided id"
            })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            message:"The ID provided is not correct , please recheck"

        })
    })
    
})

router.patch('/:productID' , (req,res,next)=>{
    const id = req.params.productID;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({
        _id : id
    },{
        $set : updateOps
    })
    .exec()
    .then(result =>{
        console.log(result)
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

router.delete('/:productID' , (req,res,next)=>{
    const id = req.params.productID;
    Product.deleteOne({
        _id : id
    })
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

export default router