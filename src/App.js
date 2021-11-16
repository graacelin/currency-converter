import React, { useEffect, useState } from 'react'
import './App.css';
import Row from './Row'
import { country_list } from './country-list.js'
import DarkModeToggle from "react-dark-mode-toggle";

const BASE_URL = "https://v6.exchangerate-api.com/v6/4efd06e36cfb923dccc7819c/latest/CAD"

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState('CAD')
    const [toCurrency, setToCurrency] = useState('CAD')
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [countryFlagFrom, setCountryFlagFrom] = useState()
    const [countryFlagTo, setCountryFlagTo] = useState()
    const [isDarkMode, setIsDarkMode] = useState(() => false);


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
            setCountryFlagTo(`flag-icon flag-icon-ca`)
            setCountryFlagFrom(`flag-icon flag-icon-ca`)
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


    function handleFromCurrencyChange(e) {
        setFromCurrency(e.target.value)
        console.log(country_list)
        for(let code in country_list) {
            console.log(code)
            if(code === e.target.value) {
                let country = String(country_list[e.target.value]).toLowerCase();
                console.log(country)
                setCountryFlagFrom(`flag-icon flag-icon-${country}`)
            }
        }
    }

    function handleToCurrencyChange(e) {
        setToCurrency(e.target.value)
        for(let code in country_list) {
            if(code === e.target.value) {
                let country = String(country_list[e.target.value]).toLowerCase();
                console.log(country)
                setCountryFlagTo(`flag-icon flag-icon-${country}`)
            }
        }
    }

    function changeTheme() {
        setIsDarkMode(!isDarkMode)
        if (isDarkMode){
            document.documentElement.setAttribute("data-theme", "light") // set theme light
            localStorage.setItem("data-theme", 'light') // save theme to local storage
        } else{
            document.documentElement.setAttribute("data-theme", "dark") // set theme to dark
            localStorage.setItem("data-theme", "dark") // save theme to local storage
        }  
    }

    return (
        <>      
            <DarkModeToggle onChange={changeTheme} checked={isDarkMode} size={60} className="darkModeToggle" />
            <h1> Currency Converter </h1>

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
            
        </>

    );
}

export default App;
