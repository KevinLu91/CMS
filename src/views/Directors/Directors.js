import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import DirectorsProfile from "../../components/DirectorsComponents/DirectorsProfile";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  background: #e3e2dd;
  min-height: 100vh;
`;

const Directors = () => {
  const [directorList, setDirectorList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/directors`)
      .then((res) => {
        console.log(res.data);
        setDirectorList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      <DirectorsProfile directorList={directorList} />
    </Wrapper>
  );
};

export default Directors;
