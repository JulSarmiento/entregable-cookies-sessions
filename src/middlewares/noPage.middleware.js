function noPageFound(req, res) {
  res.status(400).json({
    success: false, 
    message: `The roude: ${req.path} does not exist.`
  });
};

module.exports = noPageFound;