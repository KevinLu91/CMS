import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Card, Snackbar } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
import { useStyles } from "../ActorAdd/ActorAddStyle";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

import MovieList from "../../components/ActorAddComponents/MovieList";
import ActorMovies from "../../components/ActorEditComponents/ActorMovies";
import FileUpload from "../../components/ActorAddComponents/FileUpload";
import ActorImages from "../../components/ActorEditComponents/ActorImages";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;

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

const ActorEdit = () => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [movieId, setMovieId] = useState("");
  const [actorImages, setActorImages] = useState("");
  const [actorMovies, setActorMovies] = useState([]);
  const [fileId, setFileId] = useState(null);
  const [snackError, setSnackError] = useState(false);
  let slug = useParams();
  const classes = useStyles();
  const history = useHistory();
  const token = Cookie.get("token");

  useEffect(() => {
    axios
      .get(`http://localhost:1337/actors/${slug.id}`)
      .then((res) => {
        console.log(res.data);
        setActorImages(res.data.Image);
        setActorMovies(res.data.movies);
        setBiography(res.data.Biography);
        setName(res.data.Name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug.id]);

  const handleOnChange = (e) => {
    e.target.name === "name" && setName(e.target.value);
    e.target.name === "biography" && setBiography(e.target.value);
  };

  const editActor = () => {
    if (actorImages.length === 0 && !fileId) {
      setSnackError(true);
      return;
    }
    axios
      .put(
        `http://localhost:1337/actors/${slug.id}`,
        {
          Biography: biography,
          Name: name,
          movies: handleActorMovies(),
          Image: handleActorImages(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        history.push(`/actor/${slug.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleActorMovies = () => {
    let movies = [];

    actorMovies.map((movie) => movies.push(movie.id));
    if (movieId) {
      movies.push(+movieId);
    }
    return movies;
  };

  const handleActorImages = () => {
    let images = [];

    actorImages.map((image) => images.push(image.id));
    if (fileId) {
      images.push(+fileId);
    }
    return images;
  };

  return (
    <Wrapper>
      <Card className={classes.card}>
        <h2>Edit Actor</h2>
        <form autoComplete="off" style={{ marginBottom: 30 }}>
          <TextField
            fullWidth
            style={{ color: "white" }}
            variant="outlined"
            value={name}
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
            value={biography}
            label="Biography"
            multiline
            rows={8}
            name="biography"
            onChange={handleOnChange}
          />
        </form>
        <FileUpload setFileId={setFileId} />
        <ActorImages
          actorImages={actorImages}
          setActorImages={setActorImages}
        />
        <MovieList setMovieId={setMovieId} />
        <ActorMovies
          actorMovies={actorMovies}
          setActorMovies={setActorMovies}
        />
        <Button
          onClick={editActor}
          variant="contained"
          className={classes.button}
        >
          Edit Actor
        </Button>
      </Card>
      <Snackbar
        open={snackError}
        autoHideDuration={3000}
        onClose={() => setSnackError(false)}
      >
        <Alert onClose={() => setSnackError(false)} severity="error">
          Actor must have a Image!
        </Alert>
      </Snackbar>
    </Wrapper>
  );
};

export default ActorEdit;
