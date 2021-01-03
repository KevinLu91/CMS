import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import MovieProfile from "../../components/MovieComponents/MovieProfile";
import MovieImage from "../../components/MovieComponents/MovieImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
`;

const MovieView = () => {
  const [movieInfo, setMovieInfo] = useState("");
  let slug = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/movies/${slug.id}`)
      .then((res) => {
        console.log(res.data);
        setMovieInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug.id]);

  return (
    <Wrapper>
      <MovieProfile movieInfo={movieInfo} />
      <MovieImage movieInfo={movieInfo} />
    </Wrapper>
  );
};

export default MovieView;
