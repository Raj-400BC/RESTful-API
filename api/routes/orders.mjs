import express from 'express';

const router = express.Router();

router.get('/', (req ,res,next)=>{
    res.status(200).json();
})
router.get('/:orderStatus', (req ,res,next)=>{
    res.status(200).json({
        orderStatus : 'orderPlaced'
    })
})

router.post('/', (req ,res,next)=>{
    res.status(200).json({
        orderStatus : 'POST Method'
    })
})

export default router
