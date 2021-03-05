import React, { useEffect, useReducer } from "react";
import axios from "axios";
import environment from "../environment/environment";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles, Typography } from "@material-ui/core";
import VisibleElementsReducer from "../reducers/VisibleElementsReducer";
import DataReducer from "../reducers/DataReducer";
import SearchBar from "./SearchBar";

const useEpisodeListStyles = makeStyles({
  content: {
    margin: 25,
    display: "flex",
    flexDirection: "column",
  },
  counter: {
    marginTop: 7,
  },
});

const createEpisode = (row) => {
  return {
    name: row.name,
    air_date: new Date(row.air_date).toJSON().slice(0, 10),
    episode: row.episode,
    created: new Date(row.created).toJSON().slice(0, 10),
  };
};

const columns = ["name", "air_date", "episode", "created"];

const nextPage = {
  url: "",
  isLast: false,
};

const loadData = async (nextPageUrl = "") => {
  const url = nextPageUrl ? nextPageUrl : `${environment.baseUrl}/episode`;

  try {
    if (nextPage.isLast) throw new Error("Last page");
    const response = await axios.get(url);

    if (response.status === 200) {
      return {
        data: response.data.results.map((episode) => createEpisode(episode)),
        nextPage: response.data.info.next,
      };
    }
  } catch (error) {
    console.log(error);
    return { data: [], nextPage: "" };
  }
};

const EpisodeList = () => {
  const classes = useEpisodeListStyles();

  const [rows, dataDispatch] = useReducer(DataReducer, []);

  const [episodeList, visibleDispatch] = useReducer(VisibleElementsReducer, []);

  const tableRef = React.createRef();

  const isScrolledToBottom = (event) =>
    event.target.scrollTop + event.target.clientHeight + 0.5 >=
    event.target.scrollHeight;

  const handleScrollToEnd = async (event) => {
    if (isScrolledToBottom(event)) {
      const response = await loadData(nextPage.url);

      nextPage.url = response.nextPage;
      if (!nextPage.url) nextPage.isLast = true;
      dataDispatch({ type: "append", payload: response.data });
      visibleDispatch({ type: "append", payload: response.data });
    }
  };

  useEffect(() => {
    const init = async () => {
      tableRef.current.onscroll = handleScrollToEnd;

      const response = await loadData();

      nextPage.url = response.nextPage;
      dataDispatch({ type: "append", payload: response.data });
      visibleDispatch({ type: "append", payload: response.data });
    };

    init();

    return () => {
      nextPage.isLast = false;
    };
  }, []);

  return (
    <div className={classes.content}>
      <SearchBar columns={columns} dispatch={visibleDispatch} rows={rows} />
      <CollapsibleTable
        tableRef={tableRef}
        columns={columns}
        rows={episodeList}
      ></CollapsibleTable>
      <Typography variant="caption" className={classes.counter}>
        Episodes in list: {episodeList.length}
      </Typography>
    </div>
  );
};

export default EpisodeList;
