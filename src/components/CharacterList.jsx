import React, { useEffect, useState } from "react";
import axios from "axios";
import environment from '../environment/environment'
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles } from "@material-ui/core";

const useCharacterListStyles = makeStyles({
  content: {
    margin: 25
  }
})

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
    created: new Date(row.created).toDateString()
  }
}

const columns = ['name', 'status', 'species', 'gender', 'origin', 'location', 'created'];

const CharacterList = () => {
  const classes = useCharacterListStyles();

  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    axios
      .get(`${environment.baseUrl}/character`)
      .then((response) => {
        setCharacterList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.content}>
      <CollapsibleTable columns={columns} rows={characterList.map((character) => createCharacter(character))}></CollapsibleTable>
    </div>
  );
};

export default CharacterList;