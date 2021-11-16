import React, { useEffect, useState } from 'react'
import './App.css';
import Row from './Row'
import { country_list } from './country-list.js'
import DarkModeToggle from "react-dark-mode-toggle";

console.log(process.env.REACT_APP_API_KEY)
const BASE_URL = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/CAD`


const ModeSelector = () => {
    const [isDarkMode, setIsDarkMode] = useState();

    if (typeof isDarkMode === 'undefined') {
        if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
            setIsDarkMode(true)
            changeTheme()
        } else {
            setIsDarkMode(false)
        }
    }
    
    function changeTheme() {
        setIsDarkMode(!isDarkMode)
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "light") // set theme light
            localStorage.setItem("data-theme", 'light') // save theme to local storage
        } else {
            document.documentElement.setAttribute("data-theme", "dark") // set theme to dark
            localStorage.setItem("data-theme", "dark") // save theme to local storage
        }
    }

    return (<DarkModeToggle onChange={changeTheme} checked={isDarkMode} size={60} className="darkModeToggle" />)
}

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
            fetch(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/pair/${fromCurrency}/${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.conversion_rate))
        }
    }, [fromCurrency, toCurrency])

    const countryFlagFrom = `flag-icon flag-icon-${String(country_list[fromCurrency]).toLowerCase()}`
    const countryFlagTo = `flag-icon flag-icon-${String(country_list[toCurrency]).toLowerCase()}`

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    const handleToAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value)
        setAmountInFromCurrency(true)
    }

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value)
        setAmountInFromCurrency(true)
    }

    return (
        <>
            <h1> Currency Converter </h1>
            <ModeSelector />
            <Row
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
                onChangeCurrency={handleFromCurrencyChange}
                countryFlag={countryFlagFrom}
            />
            <div className="equals">=</div>
            <Row
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
                onChangeCurrency={handleToCurrencyChange}
                countryFlag={countryFlagTo}
            />

            <div className="conversion-rate">
                1 {fromCurrency} = {exchangeRate} {toCurrency}
            </div>

        </>

    );
}

export default App;