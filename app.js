const express = require('express');
const app = express();
const PORT = 3000;

const stocks = require('./routes/stocks');

app.use('/', stocks);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
