import React, { useEffect, useState } from "react";
import axios from "axios";
import environment from '../environment/environment.json'

const LocationList = () => {
  const [locationList, setLocationList] = useState([]);
  useEffect(() => {
    axios
      .get(`${environment.baseUrl}/location`)
      .then((response) => {
        setLocationList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul>
      {locationList.map((locs, id) => (
        <li key={id}>{locs.name}</li>
      ))}
    </ul>
  );
};

export default LocationList;