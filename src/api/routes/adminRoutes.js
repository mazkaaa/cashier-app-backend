const express = require('express');

const router = express.Router();
const items = require('../controllers/itemController');

router.post('/items', items.create);
router.put('/items/:itemId', items.update);
router.delete('/items/:itemId', items.delete);

module.exports = router;
