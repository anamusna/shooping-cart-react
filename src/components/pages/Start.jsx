import React from 'react';
import ShoppingCart from '../shop/ShoppingCart';
import Productlist from '../shop/ProductList';
import UserList from '../shop/UserList';

class Start extends React.Component {
  constructor (props) {
    super (props);
    this.products = [
      {
        id: '12345',
        title: 'Amazon Echo Dot',
        price: 34.99,
        currency: 'EUR',
      },
      {
        id: '12346',
        title: 'Coca Cola 0.33ml',
        price: 1,
        currency: 'EUR',
      },
      {
        id: '12347',
        title: 'Bosch Professional Bohrhammer GBH 2-26 F',
        price: 125.99,
        currency: 'EUR',
      },
    ];

    this.state = {
      shoppingCardItems: {},
    };
  }

  addShoppingCardItem = (product, amount) => {
    amount = amount || 1;

    if (typeof product !== 'object') {
      return;
    }

    if (
      !this.isValidValue (product, 'id', 'string') ||
      !this.isValidValue (product, 'title', 'string')
    ) {
      return;
    }

    let item = {
      product: product,
      amount: amount,
    };

    if (this.state.shoppingCardItems.hasOwnProperty (product.id)) {
      item.amount = this.state.shoppingCardItems[product.id].amount + amount;
    }

    this.setState (state => {
      state.shoppingCardItems[product.id] = item;
      return state;
    });
  };

  isValidValue = (obj, key, type) => {
    if (obj.hasOwnProperty (key) && typeof obj[key] === type) {
      return true;
    }

    return false;
  };

  updateShoppingCardItem = (id, amount) => {
    if (!this.state.shoppingCardItems.hasOwnProperty (id)) {
      return;
    }

    let tmp = this.state.shoppingCardItems;

    if (typeof amount !== 'number') {
      amount = parseInt (amount, 10);
    }

    if (amount > 0) {
      tmp[id].amount = amount;
    } else {
      delete tmp[id];
    }

    this.setState ({
      shoppingCardItems: tmp,
    });
  };

  render () {
    return (
      <React.Fragment>
        <div className="container">
          <UserList />
          <table width="100%" cellPadding="10">
            <tbody>
              <tr>
                <td width="50%" valign="top">
                  <Productlist
                    items={this.products}
                    onProductSelectedForShoppingCard={this.addShoppingCardItem}
                  />
                </td>
                <td valign="top">
                  <ShoppingCart
                    onProductAmountChanged={this.updateShoppingCardItem}
                    items={this.state.shoppingCardItems}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
export default Start;
