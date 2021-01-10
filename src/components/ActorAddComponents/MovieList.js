import React, { useState, useEffect } from "react";
import { InputLabel, FormControl, Select } from "@material-ui/core/";
import axios from "axios";

const MovieList = ({ setMovieId }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:1337/movies")
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnChangeMovie = (e) => {
    setMovieId(e.target.value);
  };

  return (
    <div style={{ marginTop: 30, minWidth: "60%" }}>
      <FormControl variant="outlined">
        <InputLabel>Movie</InputLabel>
        <Select
          native
          onChange={handleOnChangeMovie}
          label="Movie"
          inputProps={{
            name: "Movie",
          }}
        >
          <option value="" />
          {movies.length > 0 ? (
            movies.map((movie) => (
              <option key={movie.id} name={movie.id} value={movie.id}>
                {movie.Title}
              </option>
            ))
          ) : (
            <option value="" />
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default MovieList;
