const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

require('./api/routes/itemRoutes')(app);

const indexRouter = require('./api/routes/indexRoutes');
const dbConfig = require('./config/dbConfig');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Succesfully connected to database!');
}).catch((err) => {
  console.log('Cannot connect to database! | ', err);
  process.exit();
});

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
