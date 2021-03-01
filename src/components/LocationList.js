import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import environment from "../environment/environment.json";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles } from "@material-ui/core";
import reducer from '../reducers/CommonReducer';
import SearchBar from './SearchBar';

const useLocationListStyles = makeStyles({
  content: {
    margin: 25,
    display: 'flex',
    flexDirection: 'column'
  },
});

const createLocation = (row) => {
  return {
    name: row.name,
    type: row.type,
    dimension: row.dimension,
    created: new Date(row.created).toJSON().slice(0, 10)
  };
};

const columns = ["name", "type", "dimension", "created"];

const LocationList = () => {
  const classes = useLocationListStyles();

  const [rows, setRows] = useState([]);

    const [locationList, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    axios
      .get(`${environment.baseUrl}/location`)
      .then((response) => {
        let data = response.data.results.map((location) => createLocation(location));
        setRows(data);
        dispatch({ type: 'append', payload: data });
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
        rows={locationList.map((location) => createLocation(location))}
      ></CollapsibleTable>
    </div>
  );
};

export default LocationList;
