import React from "react";
import rick from "../../assets/rick.png";
import morty from "../../assets/morty.png";
import { Link } from "react-router-dom";

import "./Header.css";
import { Button, ButtonGroup } from "@material-ui/core";

const Header = () => {
  return (
    <div className="header">
      <img className="img-morty" src={morty} alt="Morty" />
      <ButtonGroup
        variant="text"
        color="inherit"
        aria-label="text primary button group"
      >
        <Button component={Link} to="/character">
          Characters
        </Button>
        <Button component={Link} to="/character">
          Characters
        </Button>
        <Button component={Link} to="/character">
          Characters
        </Button>
      </ButtonGroup>
      <img className="img-rick" src={rick} alt="Rick" />
    </div>
  );
};

export default Header;
