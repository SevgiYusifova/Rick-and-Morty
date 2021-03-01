import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import environment from "../environment/environment";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles } from "@material-ui/core";
import reducer from "../reducers/CommonReducer";
import SearchBar from "./SearchBar";

const useCharacterListStyles = makeStyles({
  content: {
    margin: 25,
    display: "flex",
    flexDirection: "column",
  },
});

const createCharacter = (row) => {
  return {
    name: row.name,
    status: row.status,
    species: row.species,
    type: row.type,
    gender: row.gender,
    origin: row.origin.name,
    location: row.location.name,
    image: row.image,
    created: new Date(row.created).toJSON().slice(0, 10)
  };
};

const columns = [
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "location",
  "created",
];

const CharacterList = () => {
  const classes = useCharacterListStyles();

  const [rows, setRows] = useState([]);

  const [characterList, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    axios
      .get(`${environment.baseUrl}/character`)
      .then((response) => {
        let data = response.data.results.map((character) =>
          createCharacter(character)
        );
        setRows(data);
        dispatch({ type: "append", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.content}>
      <SearchBar columns={columns} dispatch={dispatch} rows={rows} />
      <CollapsibleTable
        columns={columns}
        rows={characterList}
      ></CollapsibleTable>
    </div>
  );
};

export default CharacterList;
