import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Snackbar, Card } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
import { useStyles } from "../ActorAdd/ActorAddStyle";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;
`;

const ActorEdit = () => {
  const [actorInfo, setActorInfo] = useState("");
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  let slug = useParams();
  const classes = useStyles();
  const history = useHistory();
  const token = Cookie.get("token");

  useEffect(() => {
    axios
      .get(`http://localhost:1337/actors/${slug.id}`)
      .then((res) => {
        console.log(res.data);
        setActorInfo(res.data);
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
    // if (!fileId || !name || !biography || !movieId) {
    //   return setSnackError(true);
    // }
    axios
      .put(
        `http://localhost:1337/actors/${slug.id}`,
        { Biography: biography, Name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        history.push(`/actor/${slug.id}`);
        // setSnackSuccess(true);
        // setTimeout(() => {
        //   history.push("/actors");
        // }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Card className={classes.card}>
        <h2>Edit Actor</h2>
        <form autoComplete="off">
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
        <Button
          onClick={editActor}
          variant="contained"
          className={classes.button}
        >
          Edit Actor
        </Button>
      </Card>
    </Wrapper>
  );
};

export default ActorEdit;
