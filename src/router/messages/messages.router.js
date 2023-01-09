const express = require('express');
const router = express.Router();
const {schema, normalize, denormalize} = require('normalizr');
const util = require('util');
const Container = require('../../../classes/container.messages');
const messages = new Container('messages');


// PORT route
router.post('/', async (req, res, next) => {

  try{
    await messages.saveProduct(req.body);
    res.redirect("/public");
  }
  catch (err) {
    next(err);
  }
});


// GET all or GET by ID
router.get('/',async (_req, res, next) => {
  try{
    const authorSchema = new schema.Entity('author', {}, {idAttribute: 'id'});
    const data = await messages.getAll();

    const normalizedData = normalize(data, [authorSchema]);
    console.log(util.inspect(normalizedData, false, null, true /* enable colors */) );
  
    res.status(200).json({
      data: normalizedData
    });
  }
  catch (err) {
    next(err);
  }
});



module.exports = router;