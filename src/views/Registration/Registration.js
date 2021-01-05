import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { useStyles } from "./RegistrationStyle";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const classes = useStyles();
  const history = useHistory();

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "reenter-password") {
      setReenterPassword(e.target.value);
    }
  };

  const createUser = (e) => {
    e.preventDefault();
    if (password !== reenterPassword) {
      return console.log("password not matched");
    }
    axios
      .post("http://localhost:1337/auth/local/register", {
        username: email,
        email: email,
        password: reenterPassword,
      })
      .then((response) => {
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        history.push("/login");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src="../../../public/image/strapi.png" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="reenter-password"
            label="Reenter-Password"
            type="password"
            id="reenter-password"
            autoComplete="reenter-password"
            onChange={handleOnChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={createUser}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Back to Sign in"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Registration;
