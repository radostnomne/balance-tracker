import React, { Component } from 'react';
import InputNumber from '../common/input-number/InputNumber';
import RadioButtons from '../common/radio-buttons/RadioButtons';
import './Calculator.css';

class Calculator extends Component {

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
            changeCurrentAmount,
            changeMortgageTerm,
            changeMonthlyRepayment,
            changeFutureAmount,
            changeFutureMortgageTerm,
            changeFutureMonthlyRepayment,
            changeFutureTerm,
            changeFutureMortageType,
            futureRepaymentMethod,
            changeFutureRepaymentMethod,
        } = this.props;

        return (
            <div className="calculator">
                <div>
                    <InputNumber value={123} label={'Your income'} prefix='£' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Property price'} prefix='£' onchange={this.handleChange}/>
                </div>

                <hr/>

                <div className="current">
                    <InputNumber value={currentBorrowAmount} label={'Current borrowing amount'} prefix='£' onchange={changeCurrentAmount}/>
                    <InputNumber value={currentMortgageTerm} label={'Current mortgage term'} postfix=' years' onchange={changeMortgageTerm}/>
                    <InputNumber value={currentMonthlyRepayment} label={'Current monthly repayment'} prefix='£' onchange={changeMonthlyRepayment}/>
                </div>

                <hr/>

                <div className="future">
                    <InputNumber value={futureBorrowAmount} label={'Future borrowing amount'} prefix='£' onchange={changeFutureAmount}/>
                    <InputNumber value={futureMortgageTerm} label={'Future mortgage term'} postfix=' years' onchange={changeFutureMortgageTerm}/>
                    <InputNumber value={futureMonthlyRepayment} label={'Future monthly repayment'} prefix='£' onchange={changeFutureMonthlyRepayment}/>
                </div>

                <div>
                    <RadioButtons values={[2, 3, 5, 7, 10]} label={'Introductory term in years'} name={'term'} onchange={changeFutureTerm} selectedItem={futureTermInYears}/>
                    <RadioButtons values={['Fixed', 'Variable']} label={'Future mortgage type'} name={'type'} onchange={changeFutureMortageType} selectedItem={futureMortgageType}/>
                    <RadioButtons values={['Repayment', 'Interest Only']} label={'Future repayment method'} name={'method'} onchange={changeFutureRepaymentMethod} selectedItem={futureRepaymentMethod}/>
                </div>
            </div>
        );
    }
}

export default Calculator;
