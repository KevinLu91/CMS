import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import styled from "styled-components";

import { UserContext } from "../../components/UserContext/UserContext";
import WatchlistMovie from "../../components/WatchlistComponents/WatchlistMovie";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: black;
  min-height: 100vh;

  h2 {
    color: white;
  }
`;

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = Cookie.get("token");
    axios
      .get(`http://localhost:1337/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMovies(res.data.movies);
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <h2>Watchlist</h2>
      <WatchlistMovie movies={movies} setMovies={setMovies} />
    </Wrapper>
  );
};

export default Watchlist;
