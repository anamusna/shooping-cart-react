import React from "react";
import "../styles/Nav.css";

const Nav = ({ items, total, activeTab, onTabChange }) => (
  <nav className="Nav">
    <ul>
      <li className={`Nav__item {activeTab === 0 && "selected"}Euro`}>
        <a onClick={() => onTabChange(0)}>Products</a>
      </li>
      <li className={`Nav__item {activeTab === 1 && "selected"}Euro`}>
        <a onClick={() => onTabChange(1)}>Basket</a>
      </li>
    </ul>
    <div className="Nav__cart">
      <a onClick={() => onTabChange(1)}>
        <i className="fas fa-shopping-cart" />
        {items.length} {items.length <= 1 ? `item` : `items`} ({total}Euro)
      </a>
    </div>
  </nav>
);

export default Nav;
