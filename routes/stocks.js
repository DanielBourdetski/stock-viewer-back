const express = require('express');
const router = express.Router();

const axios = require('axios');

const { getDateString, calcMonthAgo } = require('../utils/helperFuncs');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const baseURL = 'https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=market&limit=10';

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

const getStockMarket = async ticker => {
  const today = new Date();
  const monthAgo = calcMonthAgo(today);

  const dateToday = getDateString(today);
  const dateMonthAgo = getDateString(monthAgo);

  const res = await axios.get(
    `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dateMonthAgo}/${dateToday}?adjusted=true&sort=asc&limit=31&apiKey=${apiKey}`
  );
  return res;
};

router.get('/', async (req, res) => {
  const { type, query } = req.query;

  if (!type || !query) res.status(422).send('missing query');

  let data;

  try {
    switch (type) {
      case 'ticker':
      case 'market data':
        data = await fetchStockByTicker(query);
        break;

      case 'name':
        data = await fetchStockByName(query);
        break;
    }

    const {
      data: { count, results },
    } = data;

    if (results.length === 0) return res.status(200).send();

    if (count === 1) {
      const marketData = await getStockMarket(results[0].ticker);

      res.status(200).send({ data: marketData.data, type: 'marketData', name: results[0].name });
      return;
    }

    res.send({ data: results, type: 'stock list' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
