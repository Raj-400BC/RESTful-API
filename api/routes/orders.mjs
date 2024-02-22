import express from 'express';
import mongoose from 'mongoose';
import Order from "../models/order.mjs";

const router = express.Router();

router.get('/', (req ,res,next)=>{
   Order.find()
   .select("product quantity _id")
   .exec()
   .then(result =>{
    res.status(200).json(result)
   })
   .catch(err =>{
    res.status(500).json({
        error : err,
    })
   })
})
router.get('/:StatusID', (req ,res,next)=>{
    const id = req.params.StatusID;
    if(id==='uniID'){
        res.status(200).json({
            message : "Hey mayur orders here",
            ID : id
        })
    }
    else{
        res.status(200).json({
            message : "provided invalid order id"
        })
    }
})


router.post('/', (req ,res,next)=>{
    const order = new Order({
        _id :new mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product : req.body.productID
    });
    order
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json(result)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
     
})

export default router
