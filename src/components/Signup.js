import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./signup.css";

export default function Signup() {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const history = useHistory();
  const saveName = (e) => {
    setNameInput(e.target.value);
  };

  const savePassword = (e) => {
    setPasswordInput(e.target.value);
  };

  const saveEmail = (e) => {
    setEmailInput(e.target.value);
  };

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup`,
        {
          name: nameInput,
          email: emailInput,
          password: passwordInput,
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div class="container">
        <form id="form" class="form">
          <h2>SignUp </h2>
          <div class="form-control">
            <label for="username">UserName </label>
            <input
              onChange={(e) => {
                saveName(e);
              }}
              type="text"
              id="username"
              placeholder="Enter UserName"
            />
          </div>
          <div class="form-control">
            <label for="eamil">E-mail</label>
            <input
              onChange={(e) => {
                saveEmail(e);
              }}
              type="text"
              id="email"
              placeholder="Enter E-mail"
            />
          </div>
          <div class="form-control">
            <label for="passowrd">Password</label>
            <input
              onChange={(e) => {
                savePassword(e);
              }}
              type="password"
              id="password"
              placeholder="Enter Passowrd"
            />
          </div>

          <button
            onClick={(e) => {
              addUser(e);
            }}
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
}
