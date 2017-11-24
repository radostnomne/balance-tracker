import React, { Component } from 'react';
import Calculator from '../../components/calculator/Calculator';
import Graphs from '../../components/graphs/Graphs';

import './BalanceTracker.css';

class BalanceTracker extends Component {
    render() {
        return (
            <div className="balance-tracker">
                <Calculator/>
                <Graphs/>
            </div>
        );
    }
}

export default BalanceTracker;
