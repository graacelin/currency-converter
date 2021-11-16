import React from 'react'
import './App.css'
import '../node_modules/flag-icon-css/css/flag-icons.min.css'

export default function Row(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount,
        countryFlag
    } = props
    return (
        <div className="row">
            <input type="number" className="numInput" value={amount} onChange={onChangeAmount} placeholder=""/>
            <select value ={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <span class={countryFlag}></span>
            
        </div>
    )
}