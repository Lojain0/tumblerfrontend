import React, { useState, useEffect } from "react";
import axios from "axios";
import "./like.css";

export default function Likes({ token }) {
  const [like, setLike] = useState([]);

  useEffect(async () => {
    if (token) {
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Like`,
        {
          headers: { authorization: "Bearer " + token.token },
        }
      );
      // console.log(resp.data, "33333");

      setLike(resp.data);
    }
  }, []);

  const deleteLike = async (id, i) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/Like/${id}`,
      {
        headers: { authorization: "Bearer " + token.token },
      }
    );
    const coppyDelete = [...like];
    coppyDelete.splice(i, 1);
    setLike(coppyDelete);
  };

  return (
    <div>
      {like.length ? (
        <div id="cardd">
          {/* {console.log(like)} */}
          {like.map((element, i) => {
            console.log(element);
            return (
              <div id="onecardd">
                <div>
                  <p>
                    <b> {element.user.name} ♡</b>
                  </p>
                  {element.img && (
                    <img src={element.img} className="card-img-top" alt="..." />
                  )}
                  <p>{element.text}</p>
                </div>
                <br />

                <button
                  id="btnu"
                  onClick={() => {
                    deleteLike(element._id, i);
                  }}
                >
                  ❤️
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <h1> no Likes yet</h1>
      )}
    </div>
  );
}
