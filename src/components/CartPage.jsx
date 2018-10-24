import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import "../styles/CartPage.css";

const CartPage = ({ items, total, onAddOne, onRemoveOne, onTabChange }) => {
  return (
    <div>
      <ul className="CartPage__items">
        {items.map(item => (
          <li key={item.id} className="CartPage__item">
            <Item item={item}>
              <div className="CartItem__controls">
                <button
                  className="CartItem__controls--removeOne"
                  onClick={() => onRemoveOne(item)}
                >
                  &ndash;
                </button>
                <span className="CartItem__controls--count">{item.count}</span>
                <button
                  className="CartItem__controls--addOne"
                  onClick={() => onAddOne(item)}
                >
                  +
                </button>
              </div>
            </Item>
          </li>
        ))}
      </ul>
      {items.length !== 0 ? (
        <div className="CartPage__total">Total: ${total}</div>
      ) : (
        <div className="CartPage__empty">
          <p>Your basket is empty.</p>
          <button className="button" onClick={() => onTabChange(0)}>
            Search Items
          </button>
        </div>
      )}
    </div>
  );
};

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired
};

export default CartPage;
