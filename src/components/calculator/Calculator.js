import React, { Component } from 'react';
import InputNumber from '../common/input-number/InputNumber';
import RadioButtons from '../common/radio-buttons/RadioButtons';
import './Calculator.css';

class Calculator extends Component {

    componentWillMount() {
        this.setState({ value: 0 });
    }

    handleChange = (value) => {
        console.log(value);
    }

    render() {
        return (
            <div className="calculator">
                <div>
                    <InputNumber value={123} label={'Your income'} prefix='£' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Property price'} prefix='£' onchange={this.handleChange}/>
                </div>

                <hr/>

                <div className="current">
                    <InputNumber value={123} label={'Current borrowing amount'} prefix='£' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Current mortgage term'} postfix=' years' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Current monthly repayment'} prefix='£' onchange={this.handleChange}/>
                </div>

                <hr/>

                <div className="future">
                    <InputNumber value={123} label={'Future borrowing amount'} prefix='£' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Future mortgage term'} postfix=' years' onchange={this.handleChange}/>
                    <InputNumber value={123} label={'Future monthly repayment'} prefix='£' onchange={this.handleChange}/>
                </div>

                <div>
                    <RadioButtons values={[1, 2, 3, 4, 5]} label={'Introductory term in years'} name={'term'} onchange={this.handleChange}/>
                    <RadioButtons values={['Fixed', 'Variable']} label={'Future mortgage type'} name={'type'} onchange={this.handleChange}/>
                    <RadioButtons values={['Repayment', 'Interest only']} label={'Future repayment method'} name={'method'} onchange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default Calculator;
