import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ActiveGenre from "../../components/GenreComponents/ActiveGenre";
import GenreMovieList from "../../components/GenreComponents/GenreMovieList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;
`;

const Genre = () => {
  const [genreInfo, setGenreInfo] = useState("");
  const [genreList, setGenreList] = useState("");
  const slug = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/genres/${slug.id}`)
      .then((res) => {
        console.log(res.data);
        setGenreInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug.id]);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/genres`)
      .then((res) => {
        console.log(res.data);
        setGenreList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <ActiveGenre genreInfo={genreInfo} genreList={genreList} />
      <GenreMovieList genreInfo={genreInfo} />
    </Wrapper>
  );
};

export default Genre;
