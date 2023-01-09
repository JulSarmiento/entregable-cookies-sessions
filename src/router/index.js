const express = require('express');
const router = express.Router();
const productRouter = require('./products/products.router');
const messagesRouter = require('./messages/messages.router');

router.get('/health', (_req,res) => {
    res.status(200).json({
        success: true,
        health: 'up',
        enviroment: process.env.ENVIROMENT || 'Not found.'
    })
})
.use('/products-test', productRouter)
.use('/messages', messagesRouter)


module.exports = router