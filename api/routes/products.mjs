import express, { Router } from 'express';
import mongoose from 'mongoose';
import Product from "../models/product.mjs";

const router = express.Router();

router.get('/' , (req,res,next)=>{
    res.status(200).json({
        message : "Handling the GET reqs to the products"
    })
})

router.post('/' , (req,res,next)=>{
    // const product = {
    //         name : req.body.name,
    //         price : req.body.name
    //     }
    const product = new Product({
        _id  : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.name
    })
    product.save().then(result =>{
        console.log(result);
    }).catch(err => console.log(err));

    res.status(200).json({
        message : "Handling the POST reqs to the products",
        CreatedProduct : product
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