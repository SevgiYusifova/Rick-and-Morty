import React, { useState, useEffect } from 'react';
import axios from 'axios'
import environment from '../environment/environment';
import CollapsibleTable from '../utils/CollapsibleTable/Table';
import { makeStyles } from '@material-ui/core';

const useEpisodeListStyles = makeStyles({
    content: {
        margin: 25
    }
});

const createEpisode = (row) => {
    return {
        name: row.name,
        air_date: row.air_date,
        episode: row.episode,
        created: new Date(row.created).toDateString()
    }
}

const columns = ['name', 'air_date', 'episode', 'created'];

const EpisodeList = () => {
    const classes = useEpisodeListStyles();

    const [episodeList, setEpisodeList] = useState([]);

    useEffect(() => {
        axios
            .get(`${environment.baseUrl}/episode`)
            .then((response) => {
                setEpisodeList(response.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={classes.content}>
            <CollapsibleTable columns={columns} rows={episodeList.map((episode) => createEpisode(episode))}></CollapsibleTable >
        </div>
    );
}

export default EpisodeList;