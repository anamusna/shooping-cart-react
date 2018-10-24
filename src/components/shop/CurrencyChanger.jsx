import React from "react";

class CurrencyChanger extends React.Component {
    constructor(props) {
        super(props);

        this.currencies = [
            {
                name: 'USD',
                rate: 1.16
            },
            {
                name: 'EUR',
                rate: 1
            },
            {
                name: 'EGP',
                rate: 20.73225
            }
        ];
    }

    chooseCurrency = (name) => {
        for (let i in this.currencies) {
            if (this.currencies.hasOwnProperty(i) && this.currencies[i].name === name) {
                this.props.onCurrencyChanged(this.currencies[i]);
                break;
            }
        }
    }

    render() {
        let buttonsList = this.currencies.map((currency) => {
            return (
                <button 
                    onClick={() => { this.chooseCurrency(currency.name) }} 
                    key={currency.name}
                    disabled={currency.name === this.props.current}
                >
                    {currency.name}
                </button>
            );
        })

        return (
            <div>
                {buttonsList}
            </div>
        );
    }
}

export default CurrencyChanger;
