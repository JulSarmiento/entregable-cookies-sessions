const express = require('express');
const statusCode = require('http-status');
const router = express.Router();
const UsersContainer = require('../../../classes/container.user');
const auth = require('../../middlewares/auth.middleware');


router.get('/', auth,  (req, res) => {
  if(!req.session.contador){
    req.session.contador = 0;
  }
  req.session.contador++;
  res.status(200).json({
    status: true,
    username: req.session.user.username,
    message: `${req.session.user.username} ingreso al servidor ${req.session.contador} ${req.session.contador == 1 ? "vez" : "veces"}.`,
  })
});

router.get('/logout', (req, res) => {
  req.session.destroy( err => {
    if(err){
      res.status(500).json({
        status: false,
        message: 'Error al destruir la sesión'
      });
    }
    res.status(200).json({
      status: true,
      message: 'Sesión destruida'
    });
  });
});

router.post('/signin', async (req, res) => {
  
  const { username } = req.body;
  console.log('username', username)

  if(!username){
    res.status(400).json({
      status: false,
      message: `${statusCode[422]}: Usuario incorrecto o no existe.`
    });
  }

  const current = await UsersContainer.getByName(username);
  console.log('current', current)

  if(current == null ) {
    req.session.user = {
      username
    }
  
    await UsersContainer.create(req.session.user);  
    res.status(200).json({
      status: true,
      message: 'Usuario autenticado'
    });
  }

  if(current ) {
    res.status(200).json({
      status: true,
      message:  `${statusCode[200]}: Usuario atuenticado.`
    });
  } 
    
});


module.exports = router;