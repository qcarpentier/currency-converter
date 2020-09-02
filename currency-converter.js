const axios = require("axios");

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get("http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1");

  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];

  if (isNaN(exchangeRate)) {
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }

  return exchangeRate;
};

const getCountries = async (toCurrency) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);

    return response.data.map((country) => country.name);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${toCurrency}`);
  }
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const countries = await getCountries(toCurrency);
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

  const convertedAmount = amount * exchangeRate;

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spent these in the following countries: ${countries.map((country) => `\n${country}`)}`;
};

convertCurrency("USD", "CAD", 20)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error.message);
  });
