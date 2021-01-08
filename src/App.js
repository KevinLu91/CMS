import "./App.css";
import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import { UserContext } from "./components/UserContext/UserContext";
import Home from "./views/Home/Home";
import Header from "./components/Header/Header";
import Login from "./views/Login/Login";
import Registration from "./views/Registration/Registration";
import Watchlist from "./views/Watchlist/Watchlist";
import Actor from "./views/Actor/Actor";
import MovieView from "./views/MovieView/MovieView";
import Director from "./views/Director/Director";
import Genre from "./views/Genre/Genre";
import Actors from "./views/Actors/Actors";
import ActorAdd from "./views/ActorAdd/ActorAdd";
import Directors from "./views/Directors/Directors";
import ActorEdit from "./views/ActorEdit/ActorEdit";

function App() {
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const token = Cookie.get("token");

    if (token) {
      axios
        .get("http://localhost:1337/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          if (!res) {
            Cookie.remove("token");
            setUser(null);
            return null;
          }
          const user = await res.data;
          getUser(user);
        });
    }
  }, []);

  const getUser = (user) => {
    const token = Cookie.get("token");
    axios
      .get(`http://localhost:1337/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserContext.Provider value={providerValue}>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/actors" component={Actors} />
        <Route exact path="/actor/:id" component={Actor} />
        <Route exact path="/movie/:id" component={MovieView} />
        <Route exact path="/directors" component={Directors} />
        <Route exact path="/director/:id" component={Director} />
        <Route exact path="/genre/:id" component={Genre} />
        {user && <Route path="/watchlist" component={Watchlist} />}
        {user && <Route exact path="/actors/add" component={ActorAdd} />}
        {user && <Route exact path="/actor/:id/edit" component={ActorEdit} />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
