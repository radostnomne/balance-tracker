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
                // hAxis: { title: 'Year' },
                // vAxis: { title: 'Outstanding'},
            },
            columns: [
                {
                  type: 'number',
                  label: 'Year',
                },
                {
                  type: 'number',
                  label: 'Outstanding',
                },
            ],
        };
    }

    calculation(mortgageTerm) {
        const currentYear = moment().year();
        const lastYear = currentYear + mortgageTerm;

        let index = currentYear;

        const years = Array.apply(null, Array(lastYear - currentYear)).map(() => index++);
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
                            data={[
                                ['Year', 'Outstanding'],
                                [1949,11],[1949.08333333333,11],[1949.16666666667,13],[1949.25,12],[1949.33333333333,12],[1949.41666666667,13],[1949.5,14],[1949.58333333333,14],[1949.66666666667,136],[1949.75,119],[1949.83333333333,104],[1949.91666666667,118],[1950,115],[1950.08333333333,126],[1950.16666666667,141],[1950.25,135],[1950.33333333333,125],[1950.41666666667,149],[1950.5,170],[1950.58333333333,170],[1950.66666666667,158],[1950.75,133],[1950.83333333333,114],[1950.91666666667,140],[1951,145],[1951.08333333333,150],[1951.16666666667,178],[1951.25,163],[1951.33333333333,172],[1951.41666666667,178],[1951.5,199],[1951.58333333333,199],[1951.66666666667,184],[1951.75,162],[1951.83333333333,146],[1951.91666666667,166],[1952,171],[1952.08333333333,180],[1952.16666666667,193],[1952.25,181],[1952.33333333333,183],[1952.41666666667,218],[1952.5,230],[1952.58333333333,242],[1952.66666666667,209],[1952.75,191],[1952.83333333333,172],[1952.91666666667,194],[1953,196],[1953.08333333333,196],[1953.16666666667,236],[1953.25,235],[1953.33333333333,229],[1953.41666666667,243],[1953.5,264],[1953.58333333333,272],[1953.66666666667,237],[1953.75,211],[1953.83333333333,180],[1953.91666666667,201],[1954,204],[1954.08333333333,188],[1954.16666666667,235],[1954.25,227],[1954.33333333333,234],[1954.41666666667,264],[1954.5,302],[1954.58333333333,293],[1954.66666666667,259],[1954.75,229],[1954.83333333333,203],[1954.91666666667,229],[1955,242],[1955.08333333334,233],[1955.16666666667,267],
                            ]}
                            options={ options }
                            columns={ columns }
                            graph_id="ScatterChart"
                            width="100%"
                            height="100%"
                            legend_toggle
                        />
                    </div>
                    <div className="monthly-tracker">
                        <MonthlyTracker/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Graphs;