import React, { Component } from 'react';
import AlertContainer from 'react-alert';
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
            futureMortgageType: 'Fixed',
            futureTermInYears: 2,
            futureRepaymentMethod: 'Repayment',
            alertOptions: {
                offset: 14,
                position: 'bottom right',
                theme: 'light',
                time: 3000,
                transition: 'scale'
            },
        }, () => this.calculation());
    }

    handleChangeNumber = (field, value) => {
        const o = {};
        o[field] = +value;
        this.setState(o, this.calculation());
    }

    handleChangeString = (field, value) => {
        const o = {};
        o[field] = value;
        this.setState(o, this.calculation());
    }

    interestRate = (periods, payment, present, future, type, guess) => {
        guess = (guess === undefined) ? 0.01 : guess;
        future = (future === undefined) ? 0 : future;
        type = (type === undefined) ? 0 : type;

        const epsMax = 1e-10;
        const iterMax = 10;

        let y, y0, y1, x0, x1 = 0, f = 0, i = 0;
        let rate = guess;

        if (Math.abs(rate) < epsMax) {
            y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
            f = Math.exp(periods * Math.log(1 + rate));
            y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }

        y0 = present + payment * periods + future;
        y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
        i = x0 = 0;
        x1 = rate;

        while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
            rate = (y1 * x0 - y0 * x1) / (y1 - y0);
            x0 = x1;
            x1 = rate;
            if (Math.abs(rate) < epsMax) {
                y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
            } else {
                f = Math.exp(periods * Math.log(1 + rate));
                y = present * f + payment * (1 / rate + type) * (f - 1) + future;
            }
            y0 = y1;
            y1 = y;
            ++i;
        }

        return rate;
    }

    futureMonthlyRepayment = (rate, term, amount, repaymentMethod, outstandingBalance) => {
        const pmt = (rate, term, amount) => {
            const f = (i, n) => Math.pow(1 + i, n);

            return amount * ((rate * f(rate, term)) / (f(rate, term) - 1));
        }

        return outstandingBalance < 1 || repaymentMethod === 'Interest Only' ? 0 : pmt(rate, term, amount);
    }

    interest = (amount, rate) => {
        return amount * rate;
    }

    capital = (amount, interest) => {
        return amount > 0 ? (amount + interest) : 0;
    }

    futureCapital = (amount, interest, repaymentMethod) => {
        if (amount < 1 || repaymentMethod === 'Interest Only') {
            return 0;
        } else {
            return amount + interest;
        }
    }

    getNextDate = (current) => {
        return moment(current, 'MM.YYYY').add(1, 'month').format('MM.YYYY');
    }

    futureInterestRate = (term, type) => {
        const table = new Map([
            [2, { Fixed: 0.018, Variable: 0.017 }],
            [3, { Fixed: 0.02, Variable: 0.018 }],
            [5, { Fixed: 0.025, Variable: 0.02 }],
            [7, { Fixed: 0.028, Variable: 0.02 }],
            [10, { Fixed: 0.03, Variable: 0.02 }],
        ]);

        return table.get(term)[type]/12;
    }

    showAlert = () => {
        this.alert.show('Something went wrong!', {
            time: 2000,
            type: 'success',
        });
    }

    calculation = () => {
        const {
            currentBorrowAmount,
            currentMortgageTerm,
            currentMonthlyRepayment,
            futureBorrowAmount,
            futureMortgageTerm,
            futureMonthlyRepayment,
            futureTermInYears,
            futureMortgageType,
            futureRepaymentMethod,
        } = this.state;

        const currentYear = moment().year();
        const lastYear = currentMortgageTerm > futureMortgageTerm ? currentYear + currentMortgageTerm : currentYear + futureMortgageTerm;

        const currentInterestRate = this.interestRate(currentMortgageTerm * 12, -currentMonthlyRepayment, currentBorrowAmount);
        const futureInterestRate = this.futureInterestRate(futureTermInYears, futureMortgageType);

        if (currentInterestRate <= 0) {
            this.showAlert();
        }

        let date = moment().set('year', currentYear - 1).set('month', 11).format('MM.YYYY');
        let outstandingBalance = currentBorrowAmount;
        let futureOutstandingBalance = futureBorrowAmount;

        const current = Array.apply(null, Array((lastYear - currentYear) * 12))
            .map((v, i) => {
                const interest = this.interest(outstandingBalance, currentInterestRate);
                const capital = this.capital(currentMonthlyRepayment, interest);
                const currentBalance = outstandingBalance - capital;
                outstandingBalance = currentBalance >= 0 ? currentBalance : 0;

                const fmr = this.futureMonthlyRepayment(futureInterestRate, futureMortgageTerm * 12, futureBorrowAmount, futureRepaymentMethod, futureOutstandingBalance);

                const futureInterest = this.interest(futureOutstandingBalance, futureInterestRate);
                const futureCapital = this.futureCapital(fmr, futureInterest);
                const futureBalance = futureOutstandingBalance - futureCapital;
                futureOutstandingBalance = futureBalance >= 0 ? futureBalance : 0;

                date = this.getNextDate(date);

                return [date, outstandingBalance, futureOutstandingBalance];
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
            futureMortgageType,
            futureTermInYears,
            futureRepaymentMethod,
            alertOptions,
        } = this.state;
        return (
            <div className="balance-tracker">
                <Calculator
                    changeCurrentAmount={(v) => this.handleChangeNumber('currentBorrowAmount', v)}
                    changeMortgageTerm={(v) => this.handleChangeNumber('currentMortgageTerm', v)}
                    changeMonthlyRepayment={(v) => this.handleChangeNumber('currentMonthlyRepayment', v)}
                    currentBorrowAmount={currentBorrowAmount}
                    currentMortgageTerm={currentMortgageTerm}
                    currentMonthlyRepayment={currentMonthlyRepayment}
                    changeFutureAmount={(v) => this.handleChangeNumber('futureBorrowAmount', v)}
                    changeFutureMortgageTerm={(v) => this.handleChangeNumber('futureMortgageTerm', v)}
                    changeFutureMonthlyRepayment={(v) => this.handleChangeNumber('futureMonthlyRepayment', v)}
                    futureBorrowAmount={futureBorrowAmount}
                    futureMortgageTerm={futureMortgageTerm}
                    futureMonthlyRepayment={futureMonthlyRepayment}
                    changeFutureTerm={(v) => this.handleChangeNumber('futureTermInYears', v)}
                    changeFutureMortageType={(v) => this.handleChangeString('futureMortgageType', v)}
                    changeFutureRepaymentMethod={(v) => this.handleChangeString('futureRepaymentMethod', v)}
                    futureMortgageType={futureMortgageType}
                    futureTermInYears={futureTermInYears}
                    futureRepaymentMethod={futureRepaymentMethod}
                />
                <Graphs current={this.state.current} />
                <AlertContainer ref={a => this.alert = a} {...alertOptions} />
            </div>
        );
    }
}

export default BalanceTracker;
