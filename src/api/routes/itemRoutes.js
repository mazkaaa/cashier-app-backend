const items = require('../controllers/itemController');

module.exports = (app) => {
  app.post('/items', items.create);
  app.get('/items', items.getAll);
  app.get('/items/:itemName', items.getByName);
  app.get('/items/:itemId', items.getById);
  app.put('/items/:itemId', items.update);
  app.delete('/items/:itemId', items.delete);
};
