import React, { Component } from 'react';
import moment from 'moment';
import Calculator from '../../components/calculator/Calculator';
import Graphs from '../../components/graphs/Graphs';

import './BalanceTracker.css';

class BalanceTracker extends Component {

    componentWillMount() {
        this.setState({
            current: [],
            currentBorrowAmount: 300000,
            currentMortgageTerm: 20,
            currentMonthlyRepayment: 1900,
            futureBorrowAmount: 300000,
            futureMortgageTerm: 20,
            futureMonthlyRepayment: 1900,
        }, () => this.calculation());
    }

    handleChangeCurrentBorrowAmount = (value) => {
        this.setState({ currentBorrowAmount: +value }, () => this.calculation());
    }

    handleChangeCurrentMortgageTerm = (value) => {
        this.setState({ currentMortgageTerm: +value }, () => this.calculation());
    }

    handleChangeCurrentMonthlyRepayment = (value) => {
        this.setState({ currentMonthlyRepayment: +value }, () => this.calculation());
    }

    handleChangeFutureBorrowAmount = (value) => {
        this.setState({ currentBorrowAmount: +value }, () => this.calculation());
    }

    handleChangeFutureMortgageTerm = (value) => {
        this.setState({ currentMortgageTerm: +value }, () => this.calculation());
    }

    handleChangeFutureRepayment = (value) => {
        this.setState({ currentMonthlyRepayment: +value }, () => this.calculation());
    }

    calculation = () => {
        const {
            currentBorrowAmount,
            currentMortgageTerm,
            currentMonthlyRepayment,
            futureBorrowAmount,
            futureMortgageTerm,
            futureMonthlyRepayment,
        } = this.state;
        const currentYear = moment().year();
        const lastYear = currentMortgageTerm > futureMortgageTerm ? currentYear + currentMortgageTerm : currentYear + futureMortgageTerm;

        let index = currentYear;

        const current = Array.apply(null, Array(lastYear - currentYear)).map((v, i) => {
            const current = i * 12 * currentMonthlyRepayment;
            const future = i * 12 * futureMonthlyRepayment;
            return [index++, currentBorrowAmount - current, futureBorrowAmount - future];
        });

        this.setState({ current });
    }

    render() {
        const {
            currentBorrowAmount,
            currentMortgageTerm,
            currentMonthlyRepayment,
            futureBorrowAmount,
            futureMortgageTerm,
            futureMonthlyRepayment,
        } = this.state;
        return (
            <div className="balance-tracker">
                <Calculator
                    changeCurrentAmount={this.handleChangeCurrentBorrowAmount}
                    changeMortgageTerm={this.handleChangeCurrentMortgageTerm}
                    changeMonthlyRepayment={this.handleChangeCurrentMonthlyRepayment}
                    currentBorrowAmount={currentBorrowAmount}
                    currentMortgageTerm={currentMortgageTerm}
                    currentMonthlyRepayment={currentMonthlyRepayment}
                    changeFutureAmount={this.handleChangeFutureBorrowAmount}
                    changeFutureMortgageTerm={this.handleChangeFutureMortgageTerm}
                    changeFutureMonthlyRepayment={this.handleChangeFutureRepayment}
                    futureBorrowAmount={futureBorrowAmount}
                    futureMortgageTerm={futureMortgageTerm}
                    futureMonthlyRepayment={futureMonthlyRepayment}
                />
                <Graphs
                    current={this.state.current}
                />
            </div>
        );
    }
}

export default BalanceTracker;
