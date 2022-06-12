const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const stocks = require('./routes/stocks');
const PORT = 80;

mongoose
  .connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.log(err));

app.use(cors());

app.use('/', stocks);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
