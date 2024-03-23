// const express = require('express')
import express from 'express';
import productRoutes from "./api/routes/products.mjs"
import orderRoutes from "./api/routes/orders.mjs"
import morgan from 'morgan';
import mongoose from 'mongoose';
const app = express();
app.use(morgan('dev'))

const uri = 'mongodb+srv://mayur1977be21:'+process.env.MONGO_ATLAS_PASSWORD+'@node-rest-shop.sykkypv.mongodb.net/?retryWrites=true&w=majority'
 main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri ,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, 
  });
}
// await mongoose.connect(uri).then(()=>{
//     console.log("conected");
// }).catch((error)=>{
//     console.log(error);
// })
app.use(express.json());
app.use((req , res , next)=>{
    res.header("Access-Control-Allow-Origin" , "*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin , X-requested-With , Content-Type , Accept , Authorization"
    );
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods" , "PUT , POST , GET , PATCH , DELETE");
        return res.status(200).json({})
    }
    next();
})

app.use('/orders' , orderRoutes)
app.use('/products' , productRoutes)

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status =  404;
    next(error);
})

app.use((error, req , res , next)=>{
    res.status(error.status || 500);
    res.json({
        error :{
            message : error.message
        }
    })
})


export default app;