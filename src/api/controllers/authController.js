const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/authModels');

exports.createUser = (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data content cannot be empty!',
    });
  } else {
    AuthModel.create({
      username: req.body.username,
      password: req.body.password,
    }, (err) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: 'success',
          message: 'Successfully creating user data',
          data: null,
        });
      }
    });
  }
};

exports.authenticate = (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Data content cannot be empty!',
    });
  } else {
    AuthModel.findOne({
      username: req.body.username,
    }, (err, userData) => {
      if (err) {
        next(err);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (bcrypt.compareSync(req.body.password, userData.password)) {
          const token = jwt.sign({
            // eslint-disable-next-line no-underscore-dangle
            id: userData._id,
          }, req.app.get('secretKey'), { expiresIn: '1h' });
          res.json({
            status: 'success',
            message: 'Found user in database!',
            data: {
              user: userData,
              token,
            },
          });
        } else {
          res.json({
            status: 'error',
            message: 'Invalid username or password!',
            data: null,
          });
        }
      }
    });
  }
};
