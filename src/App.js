import React, { useEffect, useState } from 'react'
import './App.css';
import Row from './Row'
import { country_list } from './country-list.js'

const BASE_URL = "https://v6.exchangerate-api.com/v6/4efd06e36cfb923dccc7819c/latest/CAD"

// function createToggle() {
//     {/* toggle theme */}
//     <div class="container">
//         <label class="switch" for="checkbox">
//             <input type="checkbox" id="checkbox" />
//             <div class="slider round"></div>
//         </label>
//     </div>
// }

// createToggle();

// const toggleSwitch =
//     document.querySelector('.theme-slider input[type="checkbox"]');
 
// /* Function to change theme */
// function switchTheme(e) {
 
//     /* Once checkbox is checked default theme change to dark */
//     if (e.target.checked) {
//         document.documentElement.setAttribute('theme', 'dark');
//     }
 
//     /* While page in dark mode and checkbox is
//     checked then theme back to change light*/
//     else {
//         document.documentElement.setAttribute('theme', 'light');
//     }
// }
 
// toggleSwitch.addEventListener('change', switchTheme, false);

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState('CAD')
    const [toCurrency, setToCurrency] = useState('CAD')
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [countryFlagFrom, setCountryFlagFrom] = useState()
    const [countryFlagTo, setCountryFlagTo] = useState()

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

    return (
        <>
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

// const themeSwitch = document.querySelector('switch');

// themeSwitch.addEventListener('change', () => {
//   document.body.classList.toggle('dark-theme');
// });

var button = document.createElement("button");
button.innerHTML = "Switch Theme";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener ("click", function() {
    let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage
    if (theme ==='dark'){
        changeThemeToLight()
    }else{
        changeThemeToDark()
    }  
});

// let theme = localStorage.getItem('data-theme');
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark") // set theme to dark
    localStorage.setItem("data-theme", "dark") // save theme to local storage
}

const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light") // set theme light
    localStorage.setItem("data-theme", 'light') // save theme to local storage
}

export default App;
