const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'Cashier Back-end API',
  });
});
module.exports = router;
