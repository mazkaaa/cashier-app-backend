const express = require('express');

const router = express.Router();
const items = require('../controllers/itemController');

router.get('/', items.getAll);
router.get('/:itemId', items.getById);

module.exports = router;
