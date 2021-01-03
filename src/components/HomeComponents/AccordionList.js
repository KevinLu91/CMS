import React, { useContext } from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

import { useStyles } from "./AccordionListStyle";
import { UserContext } from "../../components/UserContext/UserContext";

const AccordinList = ({ movieList, setOpenSnackbar }) => {
  const classes = useStyles();
  const token = Cookie.get("token");
  const history = useHistory();
  const { user } = useContext(UserContext);

  const handleAddToWatchlist = (movie) => {
    if (user) {
      axios
        .put(
          `http://localhost:1337/users/${user.id}`,
          { movies: addToWatchlist(movie) },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setOpenSnackbar(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push("/login");
    }
  };

  const addToWatchlist = (movie) => {
    let movieData = {
      Description: movie.Description,
      Image: movie.Image,
      Title: movie.Title,
      Video: movie.Video,
      id: movie.id,
    };
    let newWatchlist = [...user.movies, movieData];

    return newWatchlist;
  };

  return (
    <div className={classes.root}>
      {movieList.length > 0 ? (
        movieList.map((movie) => (
          <Accordion
            defaultExpanded={false}
            className={classes.accordion}
            key={movie.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  {movie.Title}
                </Typography>
                <div>
                  <img
                    src={`http://localhost:1337${movie.Image[0].formats.thumbnail.url}`}
                    alt={movie.Title}
                    className={classes.img}
                  />
                </div>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  Description
                </Typography>
                <Typography className={classes.description}>
                  {movie.Description}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div className={clsx(classes.column, classes.helperRight)}>
                <Typography variant="caption">
                  Genre:
                  <br />
                  {movie.genres.map((genre) => (
                    <div key={genre.id}>
                      <a href={`/genre/${genre.id}`} className={classes.link}>
                        {genre.Genre}
                      </a>
                      <br />
                    </div>
                  ))}
                </Typography>
              </div>
              <div className={classes.column}>
                <Typography variant="caption">
                  Actors:
                  <br />
                  {movie.actors.map((actor) => (
                    <div key={actor.id}>
                      <a href={`/actor/${actor.id}`} className={classes.link}>
                        {actor.Name}
                      </a>
                    </div>
                  ))}
                </Typography>
              </div>
              <div className={clsx(classes.column, classes.helper)}>
                <Typography variant="caption">
                  Director:
                  <br />
                  {movie.directors.map((director) => (
                    <div key={director.id}>
                      <a
                        href={`/director/${director.id}`}
                        className={classes.link}
                      >
                        {director.Name}
                      </a>
                    </div>
                  ))}
                </Typography>
              </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button
                className={classes.button}
                size="small"
                onClick={() => history.push(`/movie/${movie.id}`)}
              >
                More about the movie
              </Button>
              <Button
                className={classes.button}
                size="small"
                onClick={() => handleAddToWatchlist(movie)}
              >
                Add to watchlist
              </Button>
            </AccordionActions>
          </Accordion>
        ))
      ) : (
        <p>No movie..</p>
      )}
    </div>
  );
};

export default AccordinList;
