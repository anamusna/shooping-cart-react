import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import "../styles/ItemPage.css";

const ItemPage = ({ items, onAddToCart }) => {
  return (
    <ul className="ItemPage__items">
      {items.map(item => (
        <li key={item.id} className="ItemPage__item">
          <Item item={item}>
            <button className="button" onClick={() => onAddToCart(item)}>
              Add to Cart
            </button>
          </Item>
        </li>
      ))}
    </ul>
  );
};

ItemPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ItemPage;
