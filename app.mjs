// const express = require('express')
import express from 'express';
import productRoutes from "./api/routes/products.mjs"
import orderRoutes from "./api/routes/orders.mjs"
import morgan from 'morgan';
const app = express();
app.use(morgan('dev'))

app.use('/orders' , orderRoutes)
app.use('/products' , productRoutes)


export default app;