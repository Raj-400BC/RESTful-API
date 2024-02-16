import express from 'express';

const router = express.Router();

router.get('/', (req ,res,next)=>{
    res.status(200).json({
        message : "welcome to orders section using GET request"
    });
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
    const order = {
        productID : req.body.productID,
        quantity : req.body.quantity
    }
    res.status(200).json({
        orderStatus : 'POST Method',
        order : order
    })
})

export default router
