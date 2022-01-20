import React, { useState, useEffect } from "react";
import axios from "axios";
import "./account.css";

export default function Account({ token }) {
  const [user, setUser] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/infouser`,
      {
        headers: { authorization: `Bearer ${token.token}` },
      }
    );
    setUser(res.data);
    // console.log(res.data);
    setName(res.data.name);
    setEmail(res.data.email);
    setPassword(res.data.password);
    setPhoto(res.data.photo);
  }, []);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const cahngeImg = (e) => {
    setPhoto(e.target.value);
  };

  const cahngePass = (e) => {
    setPassword(e.target.value);
  };

  const cahngeEmail = (e) => {
    setEmail(e.target.value);
  };

  const update = async () => {
    if (token) {
      const result = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}
        updateuser`,
        {
          name: name,
          photo: photo,
          password: password,
          email: email,
        },
        {
          headers: { authorization: `Bearer ${token.token}` },
        }
      );
      setUser(result.data);
      setToggle(!toggle);
    }
  };

  const updatee = () => {
    setToggle(!toggle);
  };

  const alldata = (
    <div id="inp">
      <input
        onChange={(e) => {
          changeName(e);
        }}
        type="text"
        placeholder="Name"
        value={name}
      />
      <input
        onChange={(e) => {
          cahngeEmail(e);
        }}
        type="text"
        placeholder="Email"
        value={email}
      />
      <input
        onChange={(e) => {
          cahngePass(e);
        }}
        type="password"
        placeholder="Password"
        value={password}
      />
      <input
        onChange={(e) => {
          cahngeImg(e);
        }}
        type="text"
        placeholder="Profile Img"
        value={photo}
      />

      <button
        id="btn2"
        onClick={() => {
          update();
        }}
      >
        {" "}
        Update
      </button>
    </div>
  );

  return (
    <div class="container">
      <div id="form" class="form">
        <img className="onecontainer" src={user.photo} />
        <br></br>
        <br></br>
        UserName : {user.name}
        <br></br>
        <br></br>
        E-mail : {user.email}
        <br></br>
        <br></br>
        <br></br>
        <button
          id="btn"
          onClick={() => {
            updatee();
          }}
        >
          Update Your Information{" "}
        </button>
        <br></br>
        {toggle ? alldata : ""}
      </div>
    </div>
  );
}
