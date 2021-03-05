import React, { useEffect, useReducer } from 'react';
import axios from "axios";
import environment from "../environment/environment.json";
import CollapsibleTable from "../utils/CollapsibleTable/Table";
import { makeStyles, Typography } from '@material-ui/core';
import VisibleElementsReducer from '../reducers/VisibleElementsReducer';
import DataReducer from '../reducers/DataReducer';
import SearchBar from './SearchBar';

const useLocationListStyles = makeStyles({
  content: {
    margin: 25,
    display: 'flex',
    flexDirection: 'column'
  },
  counter: {
      marginTop: 7
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

const nextPage = {
  url: '',
  isLast: false
};

const loadData = async (nextPageUrl = '') => {
  const url = nextPageUrl ? nextPageUrl : `${environment.baseUrl}/location`;

  try {
      if (nextPage.isLast) throw new Error('Last page');
      const response = await axios.get(url);

      if (response.status === 200) {
          return {
              data: response.data.results.map((location) => createLocation(location)),
              nextPage: response.data.info.next
          };
      }
  } catch (error) {
      console.log(error);
      return { data: [], nextPage: '' };
  }
}

const LocationList = () => {
  const classes = useLocationListStyles();

  const [rows, dataDispatch] = useReducer(DataReducer, []);

  const [locationList, visibleDispatch] = useReducer(VisibleElementsReducer, []);

  const tableRef = React.createRef();

  const isScrolledToBottom = (event) => (event.target.scrollTop + event.target.clientHeight + 0.5 >= event.target.scrollHeight);

    const handleScrollToEnd = async (event) => {
        if (isScrolledToBottom(event)) {
            const response = await loadData(nextPage.url);

            nextPage.url = response.nextPage;
            if (!nextPage.url) nextPage.isLast = true;
            dataDispatch({ type: 'append', payload: response.data });
            visibleDispatch({ type: 'append', payload: response.data });
        }
    }

  useEffect(() => {
    const init = async () => {
      tableRef.current.onscroll = handleScrollToEnd;

      const response = await loadData();

      nextPage.url = response.nextPage;
      dataDispatch({ type: 'append', payload: response.data });
      visibleDispatch({ type: 'append', payload: response.data });
  }

  init();

  return () => {
      nextPage.isLast = false;
  }
  }, []);

  return (
    <div className={classes.content}>
      <SearchBar columns={columns} dispatch={visibleDispatch} rows={rows} />
            <CollapsibleTable tableRef={tableRef} columns={columns} rows={locationList}></CollapsibleTable>
            <Typography variant="caption" className={classes.counter}>Locations in list: {locationList.length}</Typography>
    </div>
  );
};

export default LocationList;
