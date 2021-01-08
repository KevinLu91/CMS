import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import styled from "styled-components";
import { TextField, Button, Snackbar, Card } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

import { useStyles } from "./ActorAddStyle";
import FileUpload from "../../components/ActorAddComponents/FileUpload";
import MovieList from "../../components/ActorAddComponents/MovieList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    width: 60vw;
  }

  .uploadContainer {
    margin-top: 30px;
    border: 1px solid black;
    border-radius: 3px;
    padding: 35px;
  }

  .upload {
    display: flex;
    justify-content: center;
  }

  .progress {
    height: 3px;
    width: 25vw;
    background: #eee;
    margin: auto;
    margin-top: 30px;
  }

  .progressSeek {
    height: 3px;
    width: 50vw;
    background: green;
  }
`;

const ActorAdd = () => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [fileId, setFileId] = useState(null);
  const [movieId, setMovieId] = useState("");
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackError, setSnackError] = useState(false);

  const token = Cookie.get("token");
  const classes = useStyles();
  const history = useHistory();

  const createActor = () => {
    if (!fileId || !name || !biography || !movieId) {
      return setSnackError(true);
    }
    axios
      .post(
        "http://localhost:1337/actors",
        {
          Name: name,
          Biography: biography,
          Image: [fileId],
          movies: [movieId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSnackSuccess(true);
        setTimeout(() => {
          history.push("/actors");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    e.target.name === "name" && setName(e.target.value);
    e.target.name === "biography" && setBiography(e.target.value);
  };

  return (
    <Wrapper>
      <Card className={classes.card}>
        <h2>Add Actor</h2>
        <form autoComplete="off">
          <TextField
            fullWidth
            style={{ color: "white" }}
            variant="outlined"
            className={classes.textField}
            label="Actor fullname"
            onChange={handleOnChange}
            name="name"
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            className={classes.textField}
            required
            label="Biography"
            multiline
            rows={8}
            name="biography"
            onChange={handleOnChange}
          />
        </form>
        <MovieList setMovieId={setMovieId} />
        <FileUpload setFileId={setFileId} />
        <Button
          onClick={createActor}
          variant="contained"
          className={classes.button}
        >
          Submit Actor
        </Button>
        <Snackbar
          open={snackSuccess}
          autoHideDuration={3000}
          onClose={() => setSnackSuccess(false)}
        >
          <Alert onClose={() => setSnackSuccess(false)} severity="success">
            Actor successfully created!
          </Alert>
        </Snackbar>
        <Snackbar
          open={snackError}
          autoHideDuration={3000}
          onClose={() => setSnackError(false)}
        >
          <Alert onClose={() => setSnackError(false)} severity="error">
            All fields are required!
          </Alert>
        </Snackbar>
      </Card>
    </Wrapper>
  );
};

export default ActorAdd;
