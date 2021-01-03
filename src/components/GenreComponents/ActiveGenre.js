import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;

  .genreContainer {
    display: flex;
    margin-bottom: 15px;
  }

  .link {
    text-decoration: none;
    font-weight: initial;

    :hover {
      text-decoration: underline;
    }

    :visited {
      color: blue;
    }
  }

  .linkActive {
    text-decoration: none;
    font-weight: bold;
    color: black;

    :hover {
      text-decoration: underline;
    }

    :visited {
      color: black;
    }
  }
`;

const ActiveGenre = ({ genreList, genreInfo }) => {
  const checkActiveGenre = (genre, active) => {
    if (genre === active) {
      return "linkActive";
    }
    return "link";
  };

  return (
    <Container>
      <h2 style={{ fontSize: "32px" }}>{genreInfo.Genre}</h2>
      <div className="genreContainer">
        {genreList &&
          genreList.map((genre) => (
            <div key={genre.id} style={{ marginRight: "10px" }}>
              <a
                href={`/genre/${genre.id}`}
                className={checkActiveGenre(genre.Genre, genreInfo.Genre)}
              >
                {genre.Genre}
              </a>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default ActiveGenre;
