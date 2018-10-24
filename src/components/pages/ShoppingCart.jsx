import React from "react";
import CurrencyChanger from './CurrencyChanger';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.card = {
            items: [],
            totalPrice: 0,
            totalItems: 0,
            itemPrice: 10,
            currency: 'EUR',
            currencyRate: 1,
        };

        this.state = this.card;
    }

    componentWillReceiveProps = (nextProps) => {
        if (typeof nextProps.products !== "undefined") {
            console.log('componentWillReceiveProps', nextProps.products);
            this.card.items = nextProps.products;
            this.setState(this.card);
        }
      }

    increaseTotalItems = () => {
        this.card.totalItems++;
        this.setState(this.card);
        this.calculatePrices();
    }

    calculatePrices = () => {
        if (this.card.totalItems > 0) {
            this.card.totalPrice = (
                this.card.itemPrice * this.card.totalItems
            ) * this.card.currencyRate;
        }
        this.setState(this.card);
    }

    changeCurrency = (obj) => {
        if (typeof obj !== 'object') {
            return;
        }

        if (!this.isValidValue(obj, 'name', 'string') || 
            !this.isValidValue(obj, 'rate', 'number')
        ) {
            return;
        }

        if (obj.rate < 0.1 || obj.rate > 5000) {
            return;
        }

        this.card.currency = obj.name;
        this.card.currencyRate = obj.rate;
        this.calculatePrices();
    }

    isValidValue = (obj, key, type) => {
        if (obj.hasOwnProperty(key) && typeof obj[key] === type) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.items).map(id => (
                    <div key={`shopping-card-item-${id}`}>
                        { this.props.items[id].title } {id}
                    </div>
                ))}
                <hr/>
                Total price: {this.state.totalPrice}
                <span> {this.state.currency} </span>
                <hr/>
                Total items: {this.state.totalItems}
                <hr/>
                <button onClick={this.increaseTotalItems}>+</button>
                <hr/>
                <CurrencyChanger onCurrencyChanged={this.changeCurrency}></CurrencyChanger>
            </div>
        );
    }
}

export default ShoppingCart;
