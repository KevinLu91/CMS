import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import { useStyles } from "./MovieProfileStyle";

const MovieProfile = ({ movieInfo }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={movieInfo.Title} />
      <CardContent>
        <div className={classes.genreContainer}>
          {movieInfo &&
            movieInfo.genres.map((genre) => (
              <div key={genre.id} style={{ marginRight: "10px" }}>
                <a href={`/genre/${genre.id}`} className={classes.link}>
                  {genre.Genre}
                </a>
              </div>
            ))}
        </div>
        {movieInfo && (
          <img
            style={{ width: "300px" }}
            src={`http://localhost:1337${movieInfo.Image[0].url}`}
            alt={movieInfo.Title}
          />
        )}
        <Typography component="h3" style={{ marginBottom: "15px" }}>
          Description:
        </Typography>
        <div className={classes.descriptionContainer}>
          <Typography variant="body2" color="textSecondary" component="p">
            {movieInfo.Description}
          </Typography>
        </div>
        <Typography
          component="p"
          color="textSecondary"
          style={{ fontWeight: "bold" }}
        >
          Director:{" "}
          {movieInfo &&
            movieInfo.directors.map((director) => (
              <a
                href={`/director/${director.id}`}
                className={classes.link}
                key={director.id}
              >
                {director.Name}
              </a>
            ))}
        </Typography>
        <Typography
          component="p"
          color="textSecondary"
          style={{ fontWeight: "bold" }}
        >
          Stars:{" "}
          {movieInfo &&
            movieInfo.actors.map((actor) => (
              <a
                href={`/actor/${actor.id}`}
                className={classes.link}
                key={actor.id}
              >
                {actor.Name}
              </a>
            ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieProfile;
