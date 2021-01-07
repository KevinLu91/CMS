import React, { useContext } from "react";
import {
  Accordion,
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

import { UserContext } from "../../components/UserContext/UserContext";
import { useStyles } from "../HomeComponents/AccordionListStyle";

const WatchlistMovie = ({ movies, setMovies }) => {
  const classes = useStyles();
  const token = Cookie.get("token");
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleRemoveFromWatchlist = (id) => {
    axios
      .put(
        `http://localhost:1337/users/${user.id}`,
        { movies: removeFromWatchlist(id) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromWatchlist = (id) => {
    let newWatchlist = movies.filter((movie) => movie.id !== id);
    setMovies(newWatchlist);

    return newWatchlist;
  };

  return (
    <div className={classes.root}>
      {movies.length > 0 ? (
        movies.map((movie) => (
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
                onClick={() => handleRemoveFromWatchlist(movie.id)}
              >
                Remove from watchlist
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

export default WatchlistMovie;
