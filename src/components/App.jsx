import React from "react";
import { items } from "../static-data";
import Nav from "./Nav";
import ItemPage from "./ItemPage";
import CartPage from "./CartPage";
import "../styles/base.css";
import "../styles/App.css";

class App extends React.Component {
  state = {
    activeTab: 0,
    cart: []
  };
  handleTabChange = index => {
    this.setState({
      activeTab: index
    });
  };

  handleAddToCart = item => {
    this.setState({
      cart: [...this.state.cart, item.id]
    });
  };

  handleRemoveOne = item => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1)
      ]
    });
  };

  cartCount() {
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId]++;
      return itemCounts;
    }, {});
    return itemCounts;
  }

  cartItems() {
    // Create array of items
    let cartItems = Object.keys(this.cartCount()).map(itemId => {
      // Find item by its id
      var item = items.find(item => item.id === parseInt(itemId, 10));

      // Create new "item" that also has 'count' property
      return {
        ...item,
        count: this.cartCount()[itemId]
      };
    });
    return cartItems;
  }

  cartTotal() {
    let cartTotal = 0;
    this.cartItems().forEach(item => {
      cartTotal += item.price * item.count;
    });
    return cartTotal;
  }

  renderContent() {
    switch (this.state.activeTab) {
      default:
      case 0:
        return <ItemPage items={items} onAddToCart={this.handleAddToCart} />;
      case 1:
        return this.renderCart();
    }
  }

  renderCart() {
    return (
      <CartPage
        items={this.cartItems()}
        total={this.cartTotal()}
        onAddOne={this.handleAddToCart}
        onRemoveOne={this.handleRemoveOne}
        onTabChange={this.handleTabChange}
      />
    );
  }

  render() {
    let { activeTab } = this.state;
    return (
      <div className="App">
        <div className="App__header">Shopping Card</div>
        <Nav
          activeTab={activeTab}
          onTabChange={this.handleTabChange}
          items={this.cartItems()}
          total={this.cartTotal()}
        />
        <main className="App__content">{this.renderContent()}</main>
      </div>
    );
  }
}

export default App;
