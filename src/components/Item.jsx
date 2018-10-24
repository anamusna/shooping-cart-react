import React from "react";
import PropTypes from "prop-types";
import "../styles/Item.css";

const Item = ({ item, children }) => (
  <div className="Item">
    <div className="Item--left">
    <div className="Item__title">{item.name}</div>
     
      <div className="Item__image" src="" />
      <div className="Item__description">{item.description}</div>
    </div>
    <div className="Item--right">
      <div className="Item__price">{item.price}Euro</div>
      {children}
    </div>
    
  </div>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default Item;
