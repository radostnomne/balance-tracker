import React, { Component } from 'react';
import './MonthlyTracker.css';

class MonthlyTracker extends Component {

    render() {
        return (
            <svg viewBox="0 0 500 500" className="monthly-tracker-chart">
                <g>
                    <text x="410" y="50">Savings</text>
                    <text class="text-large" x="410" y="90">$100</text>
                    <text class="text-small" x="410" y="115">per month</text>
                </g>
                <g>
                    <rect x="0" y="150" width="180" height="350" fill="#E1E1E1"></rect>
                    <text x="90" y="270">Current payment</text>
                    <text class="text-large" x="90" y="320">$1000</text>
                    <text class="text-small" x="90" y="350">per month</text>
                </g>
                <g>
                    <line x1="180" y1="150" x2="320" y2="200" />
                </g>
                <g>
                    <rect class="rect-saldo" x="322" y="150" width="176" height="348"></rect>
                    <rect x="320" y="200" width="180" height="300" fill="#C2C0C0"></rect>
                    <text x="410" y="270">Predicted payment</text>
                    <text class="text-large" x="410" y="320">$900</text>
                    <text class="text-small" x="410" y="350">per month</text>
                </g>
            </svg>
        );
    }
}

export default MonthlyTracker;