import React, { useEffect, useState } from "react";
import axios from "axios";
import environment from '../../environment/environment'
import Table from "../../utils/CollapsibleTable/Table";
import './CharacterList.css';

const createCharacter = (character) => {
  return {
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
    image: character.image,
    created: new Date(character.created).toDateString()
  }
}

const columns = ['name', 'status', 'species', 'gender', 'origin', 'location', 'created'];

const CharacterList = () => {
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
    <div className="content">
      <Table columns={columns} rows={characterList.map((character) => createCharacter(character))}></Table>
    </div>
    // <ul>
    //   {characterList.map((character, id) => (
    //     <li key={id}>{character.name}</li>
    //   ))}
    // </ul>
  );
};

export default CharacterList;