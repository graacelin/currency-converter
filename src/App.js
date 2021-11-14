import React, { useEffect, useState } from 'react'
import chimp from './img/monke.jpg'
import './App.css';
import Row from './Row'

const BASE_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=3ebad325d5d517fefa6dbab75e0ae27b&format=1"

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    console.log(currencyOptions)

    useEffect(() => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        })
    }, [])

    return (
        <>
            <img src={chimp} class="chimp" />
            <h1> Convert Currencies </h1>
            <Row />
            <div className="equals">=</div>
            <Row /> 
        </>
    );
}

export default App;
