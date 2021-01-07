import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 50vw;
`;

const MovieCarousel = ({ randomMovies }) => {
  const history = useHistory();

  const handleOnClickMovie = (id) => {
    history.push(`/movie/${id}`);
  };

  return (
    <Container>
      <Carousel showArrows={true} showThumbs={false}>
        {randomMovies.length > 0 ? (
          randomMovies.map((movie) => (
            <div
              key={movie}
              onClick={() => handleOnClickMovie(movie.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                style={{ width: "40%" }}
                src={`http://localhost:1337${movie.Image[0].url}`}
                alt={movie.title}
              />

              <p
                style={{
                  marginBottom: "30px",
                  color: "white",
                }}
              >
                {movie.Title}
              </p>
            </div>
          ))
        ) : (
          <p>No movies</p>
        )}
      </Carousel>
    </Container>
  );
};

export default MovieCarousel;
