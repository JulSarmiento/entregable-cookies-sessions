const express = require("express");
const statusCode = require("http-status");
const router = express.Router();
const UsersContainer = require("../../../classes/container.user");
const auth = require("../../middlewares/auth.middleware");

router.get("/", auth, async (req, res) => {
  const current = await UsersContainer.getByName(req.session.user.username);
  console.log("current", current);
  res.status(200).json({
    status: true,
    username: current,
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({
        status: false,
        message: "Error al destruir la sesión",
      });
    }
    res.status(200).json({
      status: true,
      message: "Sesión destruida",
    });
  });
});

router.post("/signin", async (req, res) => {
  const { username } = req.body;
  console.log("username", username);

  if (!username) {
    res.status(400).json({
      status: false,
      message: `${statusCode[422]}: Usuario incorrecto o no existe.`,
    });
    return;
  }

  let current = await UsersContainer.getByName(username);

  console.log("current", current);

  if (!Boolean(current)) {
    current = await UsersContainer.create({
      username,
    });
  }

  req.session.user = current;

  res.status(200).json({
    status: true,
    message: `${statusCode[200]}: Usuario atuenticado.`,
  });
});

module.exports = router;
