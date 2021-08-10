const Item = require('../models/itemModels');

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Item content cannot be empty!',
    });
  } else {
    Item.findOne({ name: new RegExp(`^${req.body.name}$`, 'i') }).then((itemData) => {
      if (itemData) {
        res.status(400).send({
          message: 'Item already exists!',
        });
      } else {
        const item = new Item({
          name: req.body.name,
          description: req.body.description,
          quantity: req.body.quantity,
          price: req.body.price,
        });

        item.save().then((data) => {
          res.send(data);
        }).catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
      }
    });
  }
};

exports.getAll = (req, res) => {
  Item.find().then((items) => {
    res.send(items);
  }).catch((err) => {
    res.status(500).send({
      message: err.message,
    });
  });
};

exports.containName = (req, res) => {
  Item.findOne({ name: new RegExp(`^${req.params.itemName}$`, 'i') }).then((item) => {
    if (!item) {
      return res.status(404).send({
        message: 'false',
      });
    }
    return res.status(200).send({
      message: 'true',
    });
  }).catch((err) => res.status(500).send({
    message: `Error retrieving item with name ${req.params.itemName}`,
    error: err.message,
  }));
};

exports.getByName = (req, res) => {
  Item.findOne({ name: new RegExp(`^${req.params.itemName}$`, 'i') }).then((item) => {
    if (!item) {
      return res.status(404).send({
        message: `Item not found with name ${req.params.itemName}`,
      });
    }
    return res.send(item);
  }).catch((err) => res.status(500).send({
    message: `Error retrieving item with name ${req.params.itemName}`,
    error: err.message,
  }));
};

exports.getById = (req, res) => {
  Item.findById(req.params.itemId).then((item) => {
    if (!item) {
      return res.status(404).send({
        message: `Item not found with id ${req.params.itemId}`,
      });
    }
    return res.send(item);
  }).catch((err) => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Item not found with id ${req.params.itemId}`,
      });
    }
    return res.status(500).send({
      message: `Error retrieving item with id ${req.params.itemId}`,
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Item content cannot be empty!',
    });
  } else {
    Item.findByIdAndUpdate(req.params.itemId, {
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
    }, { new: true }).then((item) => {
      if (!item) {
        return res.status(404).send({
          message: `Item not found with id ${req.params.itemId}`,
        });
      }
      return res.send(item);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Item not found with id ${req.params.itemId}`,
        });
      }
      return res.status(500).send({
        message: `Error updating item with id ${req.params.itemId}`,
      });
    });
  }
};

exports.delete = (req, res) => {
  Item.findByIdAndRemove(req.params.itemId).then((item) => {
    if (!item) {
      return res.status(404).send({
        message: `Item not found with id ${req.params.itemId}`,
      });
    }
    return res.send({
      message: 'Item deleted successfully',
    });
  }).catch((err) => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: `Item not found with id ${req.params.itemId}`,
      });
    }
    return res.status(500).send({
      message: `Error deleting item with id ${req.params.itemId}`,
    });
  });
};
