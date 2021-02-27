import React from "react";
import rick from "../../assets/rick.png";
import morty from "../../assets/morty.png";
import { Link } from "@material-ui/core";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img className="img-morty" src={morty} alt="Morty" />
      <Link to="/character">
        <h1>CharacterList</h1>
      </Link>
      <img className="img-rick" src={rick} alt="Rick" />
    </div>
  );
};

export default Header;
