const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const Logger = require('@ptkdev/logger');

const logger = new Logger();

const itemListRouter = require('./api/routes/itemRoutes');
const indexRouter = require('./api/routes/indexRoutes');
const authRouter = require('./api/routes/authRoutes');
const adminRouter = require('./api/routes/adminRoutes');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined'));

app.set('secretKey', 'nodeRestApi');

const dbConfig = require('./config/dbConfig');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  logger.info('Backend connected to database!');
}).catch((err) => {
  logger.warning('Backend cannot connected to database!');
  logger.error(`error: ${err}`);
  process.exit();
});

app.use('/', indexRouter);
app.use('/inventory', itemListRouter);
app.use('/user', authRouter);

const validateUser = (req, res, next) => {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({
        status: 'error',
        message: err.message,
        data: null,
      });
    } else {
      req.body.id = decoded.id;
      next();
    }
  });
};

app.use('/admin', validateUser, adminRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  logger.error(err);
  if (err.status === 404) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(3000, () => {
  logger.info('Backend listening on port 3000');
});
