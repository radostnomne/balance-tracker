import React, { Component } from 'react';
import './RadioButtons.css';

class RadioButtons extends Component {

    componentWillMount() {
        this.setState({ ...this.props });
    }

    onChange = (e) => {
        this.props.onchange(e.target.value);
    }

    render() {
        const { values, label, name } = this.state;
        const { selectedItem } = this.props;

        return (
            <div className="radio-container">
                <p className="label">{label}</p>
                <div className="middle">
                    {
                        values.map((value, i) => {
                            return (
                                <div className="radio-wrapper" key={i}>
                                    <input type="radio" name={name} id={value} className="visually-hidden" onClick={this.onChange} value={value} defaultChecked={selectedItem === value}/>
                                    <label htmlFor={value}>{value}</label>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default RadioButtons