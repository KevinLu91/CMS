import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "55%",
    marginBottom: 25,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
});

const GenreMovieList = ({ genreInfo }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      {genreInfo ? (
        genreInfo.movies.map((movie) => (
          <Card className={classes.root} variant="outlined" key={movie.id}>
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.title}>
                {movie.Title}
              </Typography>
              {genreInfo.movies && (
                <img
                  src={`http://localhost:1337${movie.Image[0].url}`}
                  width="150px"
                  alt={movie.Title}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/movie/${movie.id}`)}
                />
              )}

              <Typography className={classes.pos} color="textSecondary">
                Description
              </Typography>
              <div style={{ width: "50%" }}>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ textAlign: "justify" }}
                >
                  {movie.Description}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div>No movies..</div>
      )}
    </>
  );
};

export default GenreMovieList;
