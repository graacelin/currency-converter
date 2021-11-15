import React, { useEffect, useState } from 'react'
import './App.css';
import Row from './Row'

const BASE_URL = "https://v6.exchangerate-api.com/v6/4efd06e36cfb923dccc7819c/latest/CAD"

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState('CAD')
    const [toCurrency, setToCurrency] = useState('CAD')
    const [exchangeRate, setExchangeRate] = useState(1)
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
        fetch(BASE_URL).then(res => res.json()).then(data => {
            setCurrencyOptions([...Object.keys(data.conversion_rates)]);
            setFromCurrency(data.base_code);
            setToCurrency(Object.keys(data.conversion_rates)[0]);
            setExchangeRate(data.conversion_rates[Object.keys(data.conversion_rates)[0]]);
        })
    }, [])
    

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
          fetch(`https://v6.exchangerate-api.com/v6/4efd06e36cfb923dccc7819c/pair/${fromCurrency}/${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.conversion_rate))
        }
      }, [fromCurrency, toCurrency])


    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
        
    }

    function handleToAmountChange(e) {
        setAmountInFromCurrency(false)
        setAmount(e.target.value)
        console.log(toCurrency)
    }

    return (
        <>
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
