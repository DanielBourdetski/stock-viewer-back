const express = require('express');
const router = express.Router();

const axios = require('axios');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const baseURL = 'https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=market&limit=10';
const unixMonth = 2_592_000;

const fetchStockByTicker = async ticker => {
  let stockData;
  try {
    const res = await axios.get(`${baseURL}&ticker=${ticker}&apiKey=${apiKey}`);
    stockData = res;
  } catch (err) {
    console.log(err);
  }
  return stockData; // array of stock(s)
};

const fetchStockByName = async name => {
  let stocksData;
  try {
    const res = await axios.get(`${baseURL}&search=${name}&apiKey=${apiKey}`);
    stocksData = res;
  } catch (err) {
    console.log(err);
  }

  return stocksData; // array of 0, 1 or more stocks
};

router.get('/', async (req, res) => {
  const { type, query } = req.query;

  if (!type || !query) res.status(422).send('missing query');

  let data;

  switch (type) {
    case 'ticker':
      data = await fetchStockByTicker(query);
      break;

    case 'name':
      data = await fetchStockByName(query);
      break;
  }

  const {
    data: { count, results },
  } = data;

  if (count > 1) return res.send({ count, results });
});

module.exports = router;
