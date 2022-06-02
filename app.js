const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 80;

const stocks = require('./routes/stocks');

app.use(cors());

app.use('/', stocks);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
