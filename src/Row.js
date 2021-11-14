import React from 'react'
import './Row.css'

export default function Row() {
    return (
        <div className="row">
            <input type="number" className="numInput"/>
            <select>
                <option value="currency">Currency</option>
            </select>
        </div>
    )
}