import React, { Component } from 'react';
import FaMinusCircle from 'react-icons/lib/fa/minus-circle';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import './InputNumber.css';

class InputNumber extends Component {

    componentWillMount() {
        this.setState({ ...this.props });
    }

    update = (value) => {
        this.setState({ value });
        this.props.onchange(value);
    }

    increase = () => {
        const value = this.state.value + 1;
        this.update(value);
    }

    decrease = () => {
        if (this.state.value - 1 >= 0) {
            const value = this.state.value - 1;
            this.update(value)
        }
    }

    onChange = (e) => {
        const { prefix, postfix } = this.props;
        let value = e.target.value;

        if (prefix) value = value.replace(prefix, '');
        if (postfix) value = value.replace(postfix, '');

        this.update(value);
    }

    render() {
        const { value, label } = this.state;
        const { prefix, postfix } = this.props;

        const formated = `${prefix || ''}${value}${postfix || ''}`;

        return (
            <div className="input-number-container">
                <p className="label">{label}</p>
                <div className="input-wrapper">
                    <span className="input-number-decrement" onClick={this.decrease.bind(this)}>
                        <FaMinusCircle size={24}/>
                    </span>
                    <input className="input-number" type="text" value={formated} onChange={this.onChange}/>
                    <span className="input-number-increment" onClick={this.increase}>
                        <FaPlusCircle size={24}/>
                    </span>
                </div>
            </div>
        );
    }
}

export default InputNumber;
