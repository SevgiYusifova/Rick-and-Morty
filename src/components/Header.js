import React from "react";
import rick from "../assets/rick.png";
import morty from "../assets/morty.png";
import { Link } from "react-router-dom";

import { Button, ButtonGroup, makeStyles } from "@material-ui/core";

const useHeaderStyles = makeStyles({
  header: {
    backgroundColor: '#D9b48FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 30px'
  },
  imgMorty: {
    width: '7%'
  },
  imgRick: {
    width: '8%'
  }
})

const Header = () => {
  const classes = useHeaderStyles();

  return (
    <div className={classes.header}>
      <img className={classes.imgMorty} src={morty} alt="Morty" />

      <ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
        <Button component={Link} to="/character">Characters</Button>
        <Button component={Link} to="/location">Locations</Button>
        <Button component={Link} to="/episode">Episodes</Button>
      </ButtonGroup>

      <img className={classes.imgRick} src={rick} alt="Rick" />
    </div>
  );
};

export default Header;