import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import DirectorProfile from "../../components/DirectorComponents/DirectorProfile";
import DirectorMovies from "../../components/DirectorComponents/DirectorMovies";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;
`;

const Director = () => {
  const [directorInfo, setDirectorInfo] = useState("");
  const [movieList, setMovieList] = useState([]);
  const slug = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/directors/${slug.id}`)
      .then((res) => {
        console.log(res.data);
        setDirectorInfo(res.data);
        setMovieList(res.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug.id]);

  return (
    <Wrapper>
      <DirectorProfile directorInfo={directorInfo} />
      <DirectorMovies movieList={movieList} />
    </Wrapper>
  );
};

export default Director;
