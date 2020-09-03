const axios = require("axios");

const FIXER_API_KEY = "f68b13604ac8e570a00f7d8fe7f25e1b";
const FIXER_API = `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}`;
const REST_COUNTRIES_API = "https://restcountries.eu/rest/v2/currency";

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const {
      data: { rates },
    } = await axios.get(FIXER_API);

    const euro = 1 / rates[fromCurrency];
    const exchangeRate = euro * rates[toCurrency];

    return exchangeRate;
  } catch (error) {
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const { data } = await axios.get(`${REST_COUNTRIES_API}/${currencyCode}`);

    return data.map(({ name }) => name);
  } catch (error) {
    throw new Error(`Unable to get countries that use ${toCurrency}`);
  }
};

const convertCurrency = async (fromCurrency, toCurrency, amount, showCountries) => {
  let convertedAmount = 0;
  fromCurrency = fromCurrency.toUpperCase();
  toCurrency = toCurrency.toUpperCase();

  if (showCountries) {
    const [exchangeRate, countries] = await Promise.all([getExchangeRate(fromCurrency, toCurrency), getCountries(toCurrency)]);
    convertedAmount = convertAmount(amount, exchangeRate);
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. \nYou can spend these in the following countries: ${countries.map((country) => `\n${country}`)}`;
  } else {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    convertedAmount = convertAmount(amount, exchangeRate);
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.`;
  }
};

const convertAmount = (amount, exchangeRate) => {
  return (amount * exchangeRate).toFixed(2);
};

const showCountries = false;
convertCurrency("USD", "CAD", 250000, showCountries)
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));
