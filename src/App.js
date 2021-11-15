import React, { useEffect, useState } from 'react'
import chimp from './img/monke.jpg'
import './App.css';
import Row from './Row'

const BASE_URL = "https://v6.exchangerate-api.com/v6/4efd06e36cfb923dccc7819c/latest/USD"

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    useEffect(() => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            setCurrencyOptions([...Object.keys(data.conversion_rates)])
            setFromCurrency(data.base)
            setToCurrency(Object.keys(data.conversion_rates)[0])
            setExchangeRate(data.conversion_rates[Object.keys(data.conversion_rates)[0]])
        })
    }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
          fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
        }
      }, [fromCurrency, toCurrency])

    console.log(currencyOptions)

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    return (
        <>
            <img src={chimp} className="chimp" />
            <h1> Convert Currencies </h1>
            <Row 
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
            />
            <div className="equals">=</div>
            <Row 
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
            /> 
        </>
    );
}

export default App;
