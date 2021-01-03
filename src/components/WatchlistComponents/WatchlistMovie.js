import React, { useContext } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import Cookie from "js-cookie";

import { UserContext } from "../../components/UserContext/UserContext";
import { useStyles } from "../HomeComponents/AccordionListStyle";

const WatchlistMovie = ({ movies, setMovies }) => {
  const classes = useStyles();
  const token = Cookie.get("token");
  const { user } = useContext(UserContext);

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
              <Button className={classes.button} size="small">
                Cancel
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
