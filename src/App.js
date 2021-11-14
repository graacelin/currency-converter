import React from 'react'
import chimp from './img/monke.jpg'
import './App.css';
import Row from './Row'

function App() {
    return (
        <>
            <img src={chimp} class="chimp" />
            <h1> Convert Currencies </h1>
            <Row />
            <div>=</div>
            <Row /> 
        </>
    );
}

export default App;
