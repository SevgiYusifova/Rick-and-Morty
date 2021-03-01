import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: 300,
        maxHeight: 300,
    },
}));

const Details = ({ data }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    {
                        data.image &&
                        <Grid item>
                            <img className={classes.img} alt="complex" src={data.image} />
                        </Grid>
                    }

                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            {Object.keys(data).map((key, index) =>
                                <Typography key={index} variant="body2" gutterBottom>
                                    {key.toUpperCase()}: <br /> {data[key]}
                                </Typography>)}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Details;