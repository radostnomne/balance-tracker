import React, { Component } from 'react';
import InputNumber from '../common/input-number/InputNumber';
import RadioButtons from '../common/radio-buttons/RadioButtons';
import './Calculator.css';

class Calculator extends Component {

    generateMap() {
        const map = new Map();
        const model = (Fixed, Variable) => {
            return { Fixed, Variable };
        };

        map.set(2, model(0.018, 0.017));
        map.set(3, model(0.02, 0.018));
        map.set(5, model(0.025, 0.02));
        map.set(7, model(0.028, 0.02));
        map.set(10, model(0.03, 0.02));

        return map;
    }

    render() {
        const {
            currentBorrowAmount,
            currentMortgageTerm,
            currentMonthlyRepayment,
            futureBorrowAmount,
            futureMortgageTerm,
            futureMonthlyRepayment,
        } = this.props;

        return (
            <div className="calculator">
                <div>
                    <InputNumber value={123} label={'Your income'} prefix='£' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Property price'} prefix='£' onchange={this.handleChange}/>
                </div>

                <hr/>

                <div className="current">
                    <InputNumber value={currentBorrowAmount} label={'Current borrowing amount'} prefix='£' onchange={this.props.changeCurrentAmount}/>
                    <InputNumber value={currentMortgageTerm} label={'Current mortgage term'} postfix=' years' onchange={this.props.changeMortgageTerm}/>
                    <InputNumber value={currentMonthlyRepayment} label={'Current monthly repayment'} prefix='£' onchange={this.props.changeMonthlyRepayment}/>
                </div>

                <hr/>

                <div className="future">
                    <InputNumber value={futureBorrowAmount} label={'Future borrowing amount'} prefix='£' onchange={this.props.changeFutureAmount}/>
                    <InputNumber value={futureMortgageTerm} label={'Future mortgage term'} postfix=' years' onchange={this.props.changeFutureMortgageTerm}/>
                    <InputNumber value={futureMonthlyRepayment} label={'Future monthly repayment'} prefix='£' onchange={this.props.changeFutureMonthlyRepayment}/>
                </div>

                <div>
                    <RadioButtons values={[2, 3, 5, 7, 10]} label={'Introductory term in years'} name={'term'} onchange={this.props.changeFutureTerm}/>
                    <RadioButtons values={['Fixed', 'Variable']} label={'Future mortgage type'} name={'type'} onchange={this.props.changeFutureMortageType}/>
                    <RadioButtons values={['Repayment', 'Interest only']} label={'Future repayment method'} name={'method'} onchange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default Calculator;
