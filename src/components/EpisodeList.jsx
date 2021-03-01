import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import environment from "../environment/environment";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles } from "@material-ui/core";
import reducer from "../reducers/CommonReducer";
import SearchBar from "./SearchBar";

const useEpisodeListStyles = makeStyles({
  content: {
    margin: 25,
    display: "flex",
    flexDirection: "column",
  },
});

const createEpisode = (row) => {
  return {
    name: row.name,
    air_date: new Date(row.air_date).toJSON().slice(0, 10),
    episode: row.episode,
    created: new Date(row.created).toJSON().slice(0, 10)
  };
};

const columns = ["name", "air_date", "episode", "created"];

const EpisodeList = () => {
  const classes = useEpisodeListStyles();

  const [rows, setRows] = useState([]);

  const [episodeList, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    axios
      .get(`${environment.baseUrl}/episode`)
      .then((response) => {
        let data = response.data.results.map((episode) =>
          createEpisode(episode)
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
        rows={episodeList.map((episode) => createEpisode(episode))}
      ></CollapsibleTable>
    </div>
  );
};

export default EpisodeList;
