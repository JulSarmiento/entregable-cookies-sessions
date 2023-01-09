const express = require('express');
const router = express.Router();
const Container = require('../../../classes/container.class');

const products = new Container();


router.get('/', (_req, res, next) => {
  try{
    res.status(200).json({
      success: true,
      data: products.createBulkProducts()
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;