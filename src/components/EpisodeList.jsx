import React, { useState, useEffect } from 'react';
import axios from 'axios'
import environment from '../environment/environment';

const EpisodeList = () => {
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
        <ul>
            {episodeList.map((episodes, id) => (
                <li key={id}>{episodes.name}</li>
            ))}
        </ul>
    );
}

export default EpisodeList;