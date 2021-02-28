import React, { useEffect, useState } from "react";
import axios from "axios";
import environment from "../environment/environment.json";

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
    <ul>
      {characterList.map((chars, id) => (
        <li key={id}>{chars.name}</li>
      ))}
    </ul>
  );
};

export default CharacterList;
