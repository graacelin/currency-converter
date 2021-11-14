import React from 'react'
import chimp from './img/monke.jpg'
import './App.css';
import Row from './Row'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

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
