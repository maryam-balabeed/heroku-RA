import React, { useState, useEffect } from "react";
import LogIn from "./Components/logIn";
import Movies from "./Components/Movies";
import Favorit from "./Components/Favorit";
import Comment from "./Components/Comment";
import SinUp from "./Components/sinUp";
import NavBar from "./Components/NavBar";
import View from "./Views/page";

import { Route, useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap-reboot.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap-utilities.css";
import "./App.css";

import AdminHome from "./Components/AdminHome";
export default function App() {
  const [token, setToken] = useState(null);
  const [role, setrole] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (token == null) history.replace("./login");
  }, []);
  return (
    <div>
      <div className="container">
        <NavBar token={token} setToken={setToken} />

        <Route
          exact
          path="/LogIn"
          render={() => {
            return <LogIn setToken={setToken} />;
          }}
        />
        <Route exact path="/SinUp" component={SinUp} />
        <Route
          exact
          path="/admin-home"
          render={() => <AdminHome token={token} />}
        />
        <Route
          exact
          path="/Favorite"
          render={() => <Favorit token={token} />}
        />

        <Route
          exact
          path="/movies"
          render={() => {
            return <Movies token={token} />;
          }}
        />

        <Route
          exact
          path="/view"
          render={() => {
            return <View token={token} />;
          }}
        />


        <Route
          exact
          path="/Comment/:id"
          render={() => {
            return <Comment token={token} />;
          }}
        />
      </div>
    </div>
  );
}
