import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ActorMovies = ({ actorMovies, setActorMovies }) => {
  const handleDelete = (id) => {
    console.log(id);
    setActorMovies(actorMovies.filter((movie) => movie.id !== id));
  };

  return (
    <Container>
      {actorMovies.map((movie) => (
        <div key={movie.id}>
          {movie.Title}{" "}
          <Button onClick={() => handleDelete(movie.id)}>Delete</Button>
        </div>
      ))}
    </Container>
  );
};

export default ActorMovies;
