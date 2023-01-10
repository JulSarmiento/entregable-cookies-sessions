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
    message: `${req.session.user.username} ingreso al servidor ${req.session.contador} ${req.session.contador == 1 ? "vez" : "veces"}.`,
    user: req.session.user.username
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
      message: 'Usuario no enviados'
    });
  }

  const current = await UsersContainer.getByName(username);
  console.log('current', current)

  if(!current) {
    res.status(401).json({
      status: false,
      message: `${statusCode[401]}: Usuario incorrecto`
    });
  }
  console.log('current', current)

  req.session.user = {
    username: current
  }

  await UsersContainer.create(req.session.user);

  res.status(200).json({
    status: true,
    message: 'Usuario autenticado'
  });

});


module.exports = router;