import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navba({ token, setToken }) {
  return (
    <div class="topnav">
      {token.token ? (
        <ul>
          <li>
            <Link
              to="/login"
              onClick={() => {
                setToken("");
              }}
            >
              Log Out
            </Link>
            {token.payload.admin ? (
              <>
                <Link to="/posts">Posts </Link>
                <Link to="/Account">My Account </Link>
              </>
            ) : (
              <div>
                <Link to="/posts">Posts </Link>
                <Link to="/AddPost">Add Post </Link>
                <Link to="/favorite">My Favorite </Link>
                <Link to="/Account">My Account </Link>
              </div>
            )}
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link className="link" to="/">
              {" "}
              Home{" "}
            </Link>
            <Link className="link" to="/login">
              {" "}
              Log In{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
