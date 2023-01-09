const express = require('express');
const statusCode = require('http-status');
const router = express.Router();
const auth = require('../../middlewares/auth.middleware');


/**
 * @swagger
 * /session:
 * get:
 * description: Get session
 */
router.get('/', auth,  (req, res) => {
  if(!req.session.contador){
    req.session.contador = 0;
  }
  req.session.contador++;
  res.status(200).send(`${req.session.user.username} ingreso al servidor ${req.session.contador} ${req.session.contador == 1 ? "vez" : "veces"}.`)
});


/**
 * @swagger
 * /session/destroy:
 * get:
 * description: Destroy session
 */
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

/**
 * @swagger
 * /session/signin:
 * post:
 * description: Sign in
 */
router.post('/signin', (req, res) => {
  const USERNAME = 'julie';
  const PASSWORD = '1234';
  const { username, password } = req.body;

  if(!username || !password){
    res.status(400).json({
      status: false,
      message: 'Usuario o contraseña no enviados'
    });
  }

  if(username != USERNAME || password != PASSWORD) {
    res.status(401).json({
      status: false,
      message: `${statusCode[401]}: Usuario o contraseña incorrectos`
    });
  }

  req.session.user = {
    username,
    password
  }

  res.status(200).json({
    status: true,
    message: 'Usuario autenticado'
  });

});


module.exports = router;