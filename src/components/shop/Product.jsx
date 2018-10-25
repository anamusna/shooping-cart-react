import React from 'react';
import Avatar from '../shop/Avatar';

class Product extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      amount: 1,
    };
  }

  addToShoppingCard = product => {
    this.props.onAddingToShoppingCart (product, this.state.amount);
  };

  handleChange (e) {
    this.setState ({amount: parseInt (e.target.value, 10)});
  }

  render () {
    return (
      <React.Fragment>
        <div className="container">
          <table>
            <tbody>
              <td><Avatar><img src="/avatar.png" alt="avatar" /></Avatar></td>
              <td width="100%">{this.props.product.title}</td>
              <td style={{whiteSpace: 'nowrap'}}>
                {this.props.product.currency} {this.props.product.price}
              </td>
              <td>x</td>
              <td style={{whiteSpace: 'nowrap'}}>
                <input
                  type="number"
                  style={{width: '40px'}}
                  placeholder="1"
                  value={this.state.amount}
                  onChange={this.handleChange.bind (this)}
                />
                <button
                  onClick={() => {
                    this.addToShoppingCard (this.props.product);
                  }}
                >
                  + to cart
                </button>
              </td>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
