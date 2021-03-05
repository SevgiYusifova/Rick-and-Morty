import React, { useEffect, useReducer } from "react";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles, Typography } from "@material-ui/core";
import VisibleElementsReducer from "../reducers/VisibleElementsReducer";
import DataReducer from "../reducers/DataReducer";
import SearchBar from "./SearchBar";
import { loadData } from "../api/api";

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

const TYPE = "episode";

const nextPage = {
  url: "",
  isLast: false,
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
      if (nextPage.isLast) return;
      const response = await loadData(createEpisode, nextPage.url, TYPE);

      nextPage.url = response.nextPage;
      if (!nextPage.url) nextPage.isLast = true;
      dataDispatch({ type: "append", payload: response.data });
      visibleDispatch({ type: "append", payload: response.data });
    }
  };

  useEffect(() => {
    const init = async () => {
      tableRef.current.onscroll = handleScrollToEnd;

      const response = await loadData(createEpisode, "", TYPE);

      nextPage.url = response.nextPage;
      dataDispatch({ type: "append", payload: response.data });
      visibleDispatch({ type: "append", payload: response.data });
    };

    init();

    return () => {
      nextPage.isLast = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
