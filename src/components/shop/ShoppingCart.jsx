import React from "react";
import CurrencyChanger from './CurrencyChanger';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            totalPrice: 0,
            totalItems: 0,
            currency: 'EUR',
            currencyRate: 1,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.calculateSummary();
      }

    calculateSummary = () => {
        let totalItems = 0;
        let totalPrice = 0;
        let items = [];

        Object.keys(this.props.items).map(id => {
            let product = this.props.items[id];
        
            product['priceTotal'] = this.calculatePrice(
                this.props.items[id].product.price,
                this.props.items[id].amount
            );
            
            items.push(product);

            totalItems = totalItems + this.props.items[id].amount;
            totalPrice = totalPrice + this.calculatePrice(
                this.props.items[id].product.price,
                this.props.items[id].amount
            )

            return id;
        });

        this.setState({
            items: items,
            totalItems: totalItems,
            totalPrice: totalPrice.toFixed(2),
        });
    }

    priceCaption = (item, amount) => {
        if (typeof amount !== 'number') {
            amount = parseInt(amount, 10);
        }

        return `
            ${this.state.currency}
            ${this.calculatePrice(item.price, amount).toFixed(2)}
        `;
    }

    calculatePrice = (price, amount) => {
        if (typeof amount !== 'number') {
            amount = parseInt(amount, 10);
        }
        price = parseFloat(price);

        if (price > 0) {
            price = Math.round(
                ((price * this.state.currencyRate) * amount) * 100
            ) / 100
        }

        return price;
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

        this.setState({
            currency: obj.name,
            currencyRate: obj.rate,
        }, () => {
            this.calculateSummary();
        });
    }

    isValidValue = (obj, key, type) => {
        if (obj.hasOwnProperty(key) && typeof obj[key] === type) {
            return true;
        }

        return false;
    }

    changeAmount(id, e) {
        this.props.onProductAmountChanged(id, e.target.value);
    }

    render() {
        return (
            <div style={{backgroundColor: '#ffffff', padding: '20px'}}>
                <div style={{float:'right'}}>
                    <CurrencyChanger 
                        onCurrencyChanged={this.changeCurrency} 
                        current={this.state.currency}
                    />
                </div>
                Shopping cart
                <hr/>
                <table>
                    <tbody>
                    {this.state.items.map(item => (
                        <tr key={`shopping-card-item-${item.product.id}`}>
                            <td width="100%">{item.product.title}</td>
                            <td>
                                <input
                                    type="number"
                                    style={{width:'40px'}}
                                    placeholder="1"
                                    value={item.amount} 
                                    onChange={ this.changeAmount.bind(this, item.product.id) } 
                                />
                            </td>
                            <td>x</td>
                            <td style={{whiteSpace:'nowrap'}}>{this.priceCaption(item.product, 1)}</td>
                            <td>=</td>
                            <td style={{whiteSpace:'nowrap'}}>{this.priceCaption(item.product, item.amount)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                <hr/>
                Total price: {this.state.totalPrice}
                <span> {this.state.currency} </span>
                Total items: {this.state.totalItems}
                
            </div>
        );
    }
}

export default ShoppingCart;
