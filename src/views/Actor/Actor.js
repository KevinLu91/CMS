import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ProfileCard from "../../components/ActorComponents/ProfileCard";
import ActorMovies from "../../components/ActorComponents/ActorMovies";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
`;

const Actor = () => {
  const [actorInfo, setActorInfo] = useState("");
  const [movieList, setMovieList] = useState([]);
  let slug = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/actors/${slug.id}`)
      .then((res) => {
        console.log(res.data.movies);
        setActorInfo(res.data);
        setMovieList(res.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug.id]);

  return (
    <Wrapper>
      <ProfileCard actorInfo={actorInfo} />
      <ActorMovies movieList={movieList} />
    </Wrapper>
  );
};

export default Actor;
