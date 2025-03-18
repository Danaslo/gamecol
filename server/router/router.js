const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post("/login", userController.registro);
router.get("/login", userController.login);


module.exports = router;