import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LogIn from "./components/Login";
import Signup from "./components/Signup";
import Posts from "./components/Posts";
import Likes from "./components/Likes";
import Account from "./components/Account";
import AddPost from "./components/AddPost";
require("dotenv").config();

export default function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem("token");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <div>
      <Navbar setToken={setToken} token={token} />
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route
        exact
        path="/login"
        render={() => {
          return <LogIn setToken={setToken} />;
        }}
      />
      <Route
        exact
        path="/Account"
        render={() => {
          return <Account token={token} />;
        }}
      />

      <Route
        exact
        path="/posts"
        render={() => {
          return <Posts token={token} />;
        }}
      />
      <Route
        path="/AddPost"
        exact
        render={() => {
          return <AddPost token={token} />;
        }}
      />
      <Route
        exact
        path="/Favorite"
        render={() => {
          return <Likes token={token} />;
        }}
      />
    </div>
  );
}
