import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import FaInfo from 'react-icons/lib/fa/info-circle';
import './Graphs.css';

import MonthlyTracker from '../monthly-tracker/MonthlyTracker';

class Graphs extends Component {

    constructor() {
        super();
        this.state = {
            options: {
                legend: 'none',
            },
            columns: [
                {
                    type: 'number',
                    label: 'Year',
                },
                {
                    type: 'number',
                    label: 'Current Outstanding',
                },
                {
                    type: 'number',
                    label: 'Future Outstanding',
                }
            ],
        };
    }

    render() {
        const { options, columns } = this.state;

        return (
            <div className="graphs">
                <div className="nav">
                    <div className="nav-item">
                        <a href="#" className="selected">Term & Repayment</a>
                    </div>
                    <div className="nav-item">
                        <a href="#">Equity & Borrow Amount</a>
                    </div>
                    <div className="nav-item">
                        <a href="#">Rate</a>
                    </div>
                </div>

                <div className="intro">
                    <div className="decsription">
                        Lorem ipsum dolor sit amet, mundi fuisset in pri, iriure copiosae splendide pro ex. Case copiosae id pri, qui vidisse oblique recteque ei, eos te agam vocibus appellantur.
                    </div>
                    <div className="login">
                        <button>Sign Up</button>
                    </div>
                </div>

                <div className="charts">
                    <div className="balance">
                        <div className="block-header">
                            <div className="title">Outstanding Balance</div>
                            <div><FaInfo size={24}/></div>
                        </div>
                        <Chart
                            chartType="LineChart"
                            rows={this.props.current}
                            options={ options }
                            columns={ columns }
                            graph_id="ScatterChart"
                            width="100%"
                            height="100%"
                            legend_toggle
                        />
                    </div>
                    <div className="monthly-tracker">
                        <div className="block-header">
                            <div className="title">Monthly Payment Tracker</div>
                            <div><FaInfo size={24}/></div>
                        </div>
                        <MonthlyTracker/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graphs;