import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        // Remove 'USD' from the rates object to avoid duplication
        const rates = Object.keys(response.data.rates).filter(currency => currency !== 'USD');
        setCurrencies(['USD', ...rates]);
      })
      .catch(error => console.error('Error fetching currencies:', error));
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => {
          setExchangeRate(response.data.rates[toCurrency]);
        })
        .catch(error => console.error('Error fetching exchange rate:', error));
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="space-y-4">
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-full p-2 border rounded"
        placeholder="Enter amount"
      />
      <div className="flex space-x-2">
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="w-1/2 p-2 border rounded"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="w-1/2 p-2 border rounded"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      {exchangeRate !== null && (
        <div className="text-lg">
          {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;