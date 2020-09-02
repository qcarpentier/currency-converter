const axios = require("axios");

// API's
// Exchange Rate: http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1
// Countries: https://restcountries.eu/rest/v2/currency/${currencyCode}

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get("http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1");
  
  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];

  console.log(exchangeRate);
};

getExchangeRate("USD", "EUR");
