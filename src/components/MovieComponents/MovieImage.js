import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import { useStyles } from "./MovieImageStyle";

const MovieImage = ({ movieInfo }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h3" style={{ marginBottom: "15px" }}>
          Photos:
        </Typography>
        <div className={classes.imageContainer}>
          {movieInfo ? (
            movieInfo.Image.map((photo) => (
              <div key={photo.id}>
                <img
                  src={`http://localhost:1337${photo.url}`}
                  className={classes.img}
                  alt={photo.name}
                />
              </div>
            ))
          ) : (
            <p>No photos..</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieImage;
