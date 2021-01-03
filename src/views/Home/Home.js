import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container } from "./HomeStyle";
import MovieCarousel from "../../components/HomeComponents/MovieCarousel";
import AccordinList from "../../components/HomeComponents/AccordionList";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/movies")
      .then((res) => {
        setMovieList(res.data);
        console.log(res.data);
        generateRandomMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const generateRandomMovies = (data) => {
    let array = [];
    for (let i = 0; i < 3; i++) {
      array.push(data[Math.floor(Math.random() * data.length)]);
    }
    let noDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) === index);

    setRandomMovies(noDuplicates(array));
  };

  return (
    <Container>
      <h2>Recommended movies</h2>
      <MovieCarousel randomMovies={randomMovies} />
      <AccordinList movieList={movieList} />
    </Container>
  );
};

export default Home;
