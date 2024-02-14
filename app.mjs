// const express = require('express')
import express from 'express';
import productRoutes from "./api/routes/products.mjs"
import orderRoutes from "./api/routes/products.mjs"
const app = express();

app.use('/orders' , orderRoutes)
app.use('/products' , productRoutes)


export default app;