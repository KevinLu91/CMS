import React, { useContext } from "react";
import { Container, Typography, Box } from "@material-ui/core";
import {
  Movie,
  Grade,
  Theaters,
  MovieFilter,
  PersonAdd,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import { useStyles } from "./DrawerMenuStyle";
import { UserContext } from "../../components/UserContext/UserContext";

const DrawerMenu = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Box className={classes.box} onClick={() => history.push("/")}>
        <Movie className={classes.icon} />
        <Typography>Movies</Typography>
      </Box>
      <Box className={classes.box} onClick={() => history.push("/genre/1")}>
        <MovieFilter className={classes.icon} />
        <Typography>Genre</Typography>
      </Box>
      <Box className={classes.box} onClick={() => history.push("/actors")}>
        <Grade className={classes.icon} />
        <Typography>Actors</Typography>
      </Box>
      {user && (
        <Box
          className={classes.box}
          onClick={() => history.push("/actors/add")}
        >
          <PersonAdd className={classes.icon} />
          <Typography>Add actor</Typography>
        </Box>
      )}
      <Box className={classes.box} onClick={() => history.push("/directors")}>
        <Theaters className={classes.icon} />
        <Typography>Directors</Typography>
      </Box>
    </Container>
  );
};

export default DrawerMenu;
