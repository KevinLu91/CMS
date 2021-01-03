import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import ActorsProfile from "../../components/ActorsComponents/ActorsProfile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;
`;

const Actors = () => {
  const [actorList, setActorList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/actors`)
      .then((res) => {
        console.log(res.data);
        setActorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <ActorsProfile actorList={actorList} />
    </Wrapper>
  );
};

export default Actors;
