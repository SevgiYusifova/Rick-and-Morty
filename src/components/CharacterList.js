import React, { useEffect, useState } from "react";
import axios from "axios";
import environment from '../environment/environment.json'

const CharacterList = () => {
  const [CharacterList, GetCharacterList] = useState([]);
  useEffect(() => {
    axios
      .get(`${environment.baseUrl}/character`)
      .then((response) => {
        GetCharacterList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul>
      {CharacterList.map((locs, id) => (
        <li key={id}>{locs.name}</li>
      ))}
    </ul>
  );
};

export default CharacterList;
