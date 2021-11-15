import React from 'react'
import './Row.css'
import '../node_modules/flag-icon-css/css/flag-icons.min.css'

export default function Row(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div className="row">
            <input type="number" className="numInput" value={amount} onChange={onChangeAmount}/>
            <select value ={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}