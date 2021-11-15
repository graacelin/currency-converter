import { div } from 'prelude-ls';
import React, { useEffect, useState } from 'react'
import './App.css';
import Row from './Row'

const BASE_URL = "https://v6.exchangerate-api.com/v6/4efd06e36cfb923dccc7819c/latest/CAD"

let country_list = {
    "AED" : "AE",
    "AFN" : "AF",
    "XCD" : "AG",
    "ALL" : "AL",
    "AMD" : "AM",
    "ANG" : "AN",
    "AOA" : "AO",
    "AQD" : "AQ",
    "ARS" : "AR",
    "AUD" : "AU",
    "AZN" : "AZ",
    "BAM" : "BA",
    "BBD" : "BB",
    "BDT" : "BD",
    "XOF" : "BE",
    "BGN" : "BG",
    "BHD" : "BH",
    "BIF" : "BI",
    "BMD" : "BM",
    "BND" : "BN",
    "BOB" : "BO",
    "BRL" : "BR",
    "BSD" : "BS",
    "NOK" : "BV",
    "BWP" : "BW",
    "BYR" : "BY",
    "BZD" : "BZ",
    "CAD" : "CA",
    "CDF" : "CD",
    "XAF" : "CF",
    "CHF" : "CH",
    "CLP" : "CL",
    "CNY" : "CN",
    "COP" : "CO",
    "CRC" : "CR",
    "CUP" : "CU",
    "CVE" : "CV",
    "CYP" : "CY",
    "CZK" : "CZ",
    "DJF" : "DJ",
    "DKK" : "DK",
    "DOP" : "DO",
    "DZD" : "DZ",
    "ECS" : "EC",
    "EEK" : "EE",
    "EGP" : "EG",
    "ETB" : "ET",
    "EUR" : "FR",
    "FJD" : "FJ",
    "FKP" : "FK",
    "GBP" : "GB",
    "GEL" : "GE",
    "GGP" : "GG",
    "GHS" : "GH",
    "GIP" : "GI",
    "GMD" : "GM",
    "GNF" : "GN",
    "GTQ" : "GT",
    "GYD" : "GY",
    "HKD" : "HK",
    "HNL" : "HN",
    "HRK" : "HR",
    "HTG" : "HT",
    "HUF" : "HU",
    "IDR" : "ID",
    "ILS" : "IL",
    "INR" : "IN",
    "IQD" : "IQ",
    "IRR" : "IR",
    "ISK" : "IS",
    "JMD" : "JM",
    "JOD" : "JO",
    "JPY" : "JP",
    "KES" : "KE",
    "KGS" : "KG",
    "KHR" : "KH",
    "KMF" : "KM",
    "KPW" : "KP",
    "KRW" : "KR",
    "KWD" : "KW",
    "KYD" : "KY",
    "KZT" : "KZ",
    "LAK" : "LA",
    "LBP" : "LB",
    "LKR" : "LK",
    "LRD" : "LR",
    "LSL" : "LS",
    "LTL" : "LT",
    "LVL" : "LV",
    "LYD" : "LY",
    "MAD" : "MA",
    "MDL" : "MD",
    "MGA" : "MG",
    "MKD" : "MK",
    "MMK" : "MM",
    "MNT" : "MN",
    "MOP" : "MO",
    "MRO" : "MR",
    "MTL" : "MT",
    "MUR" : "MU",
    "MVR" : "MV",
    "MWK" : "MW",
    "MXN" : "MX",
    "MYR" : "MY",
    "MZN" : "MZ",
    "NAD" : "NA",
    "XPF" : "NC",
    "NGN" : "NG",
    "NIO" : "NI",
    "NPR" : "NP",
    "NZD" : "NZ",
    "OMR" : "OM",
    "PAB" : "PA",
    "PEN" : "PE",
    "PGK" : "PG",
    "PHP" : "PH",
    "PKR" : "PK",
    "PLN" : "PL",
    "PYG" : "PY",
    "QAR" : "QA",
    "RON" : "RO",
    "RSD" : "RS",
    "RUB" : "RU",
    "RWF" : "RW",
    "SAR" : "SA",
    "SBD" : "SB",
    "SCR" : "SC",
    "SDG" : "SD",
    "SEK" : "SE",
    "SGD" : "SG",
    "SKK" : "SK",
    "SLL" : "SL",
    "SOS" : "SO",
    "SRD" : "SR",
    "STD" : "ST",
    "SVC" : "SV",
    "SYP" : "SY",
    "SZL" : "SZ",
    "THB" : "TH",
    "TJS" : "TJ",
    "TMT" : "TM",
    "TND" : "TN",
    "TOP" : "TO",
    "TRY" : "TR",
    "TTD" : "TT",
    "TWD" : "TW",
    "TZS" : "TZ",
    "UAH" : "UA",
    "UGX" : "UG",
    "USD" : "US",
    "UYU" : "UY",
    "UZS" : "UZ",
    "VEF" : "VE",
    "VND" : "VN",
    "VUV" : "VU",
    "YER" : "YE",
    "ZAR" : "ZA",
    "ZMK" : "ZM",
    "ZWD" : "ZW"
}

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
                onChangeCurrency={e => 
                    {
                        setFromCurrency(e.target.value)
                        for(let code in country_list) {
                            if(code == fromCurrency) {
                                // let text=country_list[code].toLowerCase();
                                let text="ga"
                                let toAdd=`flag-icon flag-icon-${text}`;
                                // <span class={toAdd}></span>
                            }
                        }
                    }
                }
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

// const themeSwitch = document.querySelector('switch');

// themeSwitch.addEventListener('change', () => {
//   document.body.classList.toggle('dark-theme');
// });

var button = document.createElement("button");
button.innerHTML = "Switch Theme";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener ("click", function() {
    document.body.classList.toggle('dark-theme');
});

export default App;
