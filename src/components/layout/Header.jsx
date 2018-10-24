import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <div className={"collapse navbar-collapse"}>
          <ul className={"navbar-nav mr-auto"}>
            <li className={"nav-item"}>
              <Link to="/" className={"nav-link"}>Home</Link>
            </li>
            <li className={"nav-item"}>
              <Link to="/books" className={"nav-link"}>Books</Link>
            </li>
    
          </ul>
        </div>
      </nav>
      
    );
  }
}
export default Header;