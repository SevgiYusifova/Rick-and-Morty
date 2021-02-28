import React, { useEffect, useState } from "react";
import axios from "axios";
import environment from "../environment/environment.json";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles } from "@material-ui/core";

const useLocationListStyles = makeStyles({
  content: {
    margin: 25,
  },
});

const createLocation = (row) => {
  return {
    name: row.name,
    type: row.type,
    dimension: row.dimension,
    created: new Date(row.created).toDateString(),
  };
};

const columns = ["name", "type", "dimension", "created"];

const LocationList = () => {
  const classes = useLocationListStyles();

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
    <div className={classes.content}>
      <CollapsibleTable
        columns={columns}
        rows={locationList.map((location) => createLocation(location))}
      ></CollapsibleTable>
    </div>
  );
};

export default LocationList;
