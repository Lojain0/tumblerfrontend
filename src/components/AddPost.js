import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";

export default function AddPost({ token }) {
  const [img, setImg] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const changeImgVal = (e) => {
    setImg(e.target.value);
  };

  const changeTextVal = (e) => {
    setText(e.target.value);
  };

  const addPost = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts`,
      {
        newImg: img,
        newtext: text,
      },
      {
        headers: { authorization: `Bearer ${token.token}` },
      }
    );
    setImg("");
    setText("");
  };

  const types = ["image/png", "image/jpeg"];
  const handleChange = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <div>
      <div></div>

      <div class="container">
        <div id="form" class="form">
          <h2>AddPost</h2>
          <div class="form-control">
            <label for="img"> Add Img </label>
            <input
              onChange={(e) => {
                changeImgVal(e);
              }}
              value={img}
              type="text"
              id="text"
              placeholder=" Add Img  "
            />{" "}
          </div>
          <input type="file" onChange={handleChange} />
          <div>
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && (
              <ProgressBar file={file} setFile={setFile} setImg={setImg} />
            )}
          </div>

          <div class="form-control">
            <label for="text"> text</label>
            <input
              onChange={(e) => {
                changeTextVal(e);
              }}
              value={text}
              type="text"
              id="text"
              placeholder="Add Text"
            />
          </div>
          <br></br>

          <button
            onClick={() => {
              addPost();
            }}
            type="submit"
          >
            Add Post
          </button>
        </div>
      </div>
    </div>
  );
}
