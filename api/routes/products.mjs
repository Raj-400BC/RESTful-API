import express, { Router } from 'express';
import mongoose from 'mongoose';
import Product from "../models/product.mjs";

const router = express.Router();

router.get('/' , (req,res,next)=>{
   Product.find()
   .select("name price _id")
   .exec()
   .then(docs =>{
        const result = {
            count : docs.length ,
            products: docs.map(doc => {
                return {
                    name : doc.name,
                    price : doc.price,
                    _id : doc._id,
                    request : {
                        type : "GET",
                        url : 'http://localhost:3000/products/' + doc._id 
                    }
                }
            })
        }
        res.status(200).json(result);
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
    product
    .save()
    .then(result =>{
        res.status(200).json({
            message : "Created product successfully",
            CreatedProduct : {
                name : product.name,
                price : product.price,
                _id : product._id,
                request :{
                    tpye: "GET",
                    url : 'http://localhost:3000/products/' + result._id
                }
            }
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
    .select("name price _id")
    .exec()
    .then(doc => {
        if(doc){
        res.status(200).json({
            product : doc,
            request : {
                tpye : "GET",
                description : "GET_ALL_PRODUCTS",
                url : "http://localhost:3000/products"
            }
        })
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
        res.status(200).json({
            product : result,
            request : {
                type : "GET",
                url : "http://localhost:3000/products/" + id
            }
        });
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
        res.status(200).json({
            message : "Product Deleted",
            request : {
                type : "POST",
                url : "http://localhost:3000/products",
                data : {
                    name : "String",
                    price : " Number"
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

export default router