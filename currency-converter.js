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

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  fromCurrency = fromCurrency.toUpperCase();
  toCurrency = toCurrency.toUpperCase();

  const [exchangeRate, countries] = await Promise.all([getExchangeRate(fromCurrency, toCurrency), getCountries(toCurrency)]);

  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries.map((country) => `\n${country}`)}`;
};

convertCurrency("EUR", "CAD", 20)
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));
