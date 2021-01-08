import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import ProfileCard from "../../components/ActorComponents/ProfileCard";
import ActorMovies from "../../components/ActorComponents/ActorMovies";
import ActorActions from "../../components/ActorComponents/ActorActions";
import { UserContext } from "../../components/UserContext/UserContext";

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
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/actors/${slug.id}`)
      .then((res) => {
        console.log(res.data);
        setActorInfo(res.data);
        setMovieList(res.data.movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug.id]);

  return (
    <Wrapper>
      {user && <ActorActions actorInfo={actorInfo} />}
      <ProfileCard actorInfo={actorInfo} />
      <ActorMovies movieList={movieList} />
    </Wrapper>
  );
};

export default Actor;
