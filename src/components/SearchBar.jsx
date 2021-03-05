import { Button, IconButton, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from 'react';

import { TextField, FormControl, Select, MenuItem } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const useSearchBarStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
    alignItems: "center",
  },
  control: {
    margin: 7,
  },
});

const SearchBar = ({ columns, dispatch, rows }) => {
  const classes = useSearchBarStyles();

  const [searchText, setSearchText] = useState("");
  const [searchColumn, setSearchColumn] = useState(columns[0]);

  const handleTextFieldChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSearchColumn(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    dispatch({
      type: "filter",
      propertyName: searchColumn,
      payload: searchText,
      rows: rows,
    });
  };

  const clear = () => {
    setSearchText("");
    dispatch({
      type: "filter",
      propertyName: searchColumn,
      payload: "",
      rows: rows,
    });
  };

  useEffect(() => {
    dispatch({type:"filter", propertyName: searchColumn, payload: searchText, rows: rows});
}, [rows])

  return (
    <div className={classes.container}>
      <form onSubmit={search}>
        <IconButton color="primary" onClick={clear}>
          <DeleteOutline />
        </IconButton>
        <TextField
          placeholder="Search"
          color="primary"
          variant="standard"
          onChange={handleTextFieldChange}
          value={searchText}
          className={classes.control}
        />
        <FormControl
          variant="standard"
          color="primary"
          className={classes.control}
        >
          <Select
            value={searchColumn}
            onChange={handleSelectChange}
            displayEmpty
          >
            {columns.map((col, index) => (
              <MenuItem key={index} value={col}>
                {col}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={search}
          className={classes.control}
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
