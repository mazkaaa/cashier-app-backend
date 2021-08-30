const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.authenticate);
router.post('/register', authController.createUser);

module.exports = router;
