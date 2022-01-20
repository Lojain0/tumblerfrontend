import React, { useState, useEffect } from "react";
import axios from "axios";
import "./posts.css";

export default function Posts({ token }) {
  const [Posts, setPosts] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [inputSearch, SetInputSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [upText, setUpText] = useState("");
  const [like, setLike] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      headers: { authorization: `Bearer ${token.token}` },
    });
    setPosts(res.data);
    console.log(res.data, "ww");

    const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/Like`, {
      headers: { authorization: "Bearer " + token.token },
    });

    console.log(resp.data, "33333");
    setLike(resp.data);
  }, []);

  const deletepost = async (id, index) => {
    const deletepost = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
      {
        headers: { authorization: "Bearer " + token.token },
      }
    );
    console.log(deletepost.data);
    const copiedArr = [...Posts];
    copiedArr.splice(index, 1);
    setPosts(copiedArr);
    setSearchArr(copiedArr);
    setToggle(false);
  };

  const updatePost = async (id) => {
    const update = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
      {
        text: upText,
      },
      {
        headers: { authorization: "Bearer " + token.token },
      }
    );
    setPosts(update.data);
    setToggle(!toggle);
  };

  const updaetTextVal = (e) => {
    setUpText(e.target.value);
  };

  const ChangeToggel = () => {
    setToggle(!toggle);
  };

  function setvalue(e) {
    SetInputSearch(e.target.value);
    setSearchArr(Posts);
  }

  function search(e) {
    const search = Posts.filter((element) => {
      if (
        element.text.toLowerCase().includes(inputSearch.toLocaleLowerCase())
      ) {
        return element;
      }

      console.log(element);
    });
    setSearchArr(search);
  }

  const addLike = async (id) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/Like/${id}`,
        {},
        {
          headers: { authorization: "Bearer " + token.token },
        }
      );
      console.log(result.data);
      setLike(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLike = async (id, i) => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/Like/${id}`,
      {
        headers: { authorization: "Bearer " + token.token },
      }
    );
    setLike(res.data);
  };

  return (
    <>
      <div id="serch">
        <input
          id="input"
          onChange={setvalue}
          type="text"
          className="se"
          placeholder="Search Here"
        />
        <button className="btn" onClick={search}>
          Search
        </button>
      </div>

      <div id="card">
        {searchArr.length
          ? searchArr.map((element, i) => {
              let buttonVar = (
                <button
                  className="btnprimary"
                  onClick={() => {
                    addLike(element._id);
                  }}
                >
                  {" "}
                  🤍{" "}
                </button>
              );

              for (let i = 0; i < like.length; i++) {
                if (like[i]._id == element._id) {
                  buttonVar = (
                    <button
                      id="btnu"
                      onClick={() => {
                        deleteLike(element._id, i);
                      }}
                    >
                      ❤️
                    </button>
                  );
                }
              }
              return (
                <div id="onecard" key={element._id}>
                  <b> {element.user.name} ♡</b>
                  <br></br>
                  {element.img && (
                    <img src={element.img} className="card-img-top" alt="..." />
                  )}
                  <p>{element.text}</p>
                  {token.payload.admin ? (
                    ""
                  ) : (
                    <div>
                      {buttonVar}
                      {/* {toggle2 ? (
                        <button
                          className="btnprimary"
                          onClick={() => {
                            addLike(element._id);
                          }}
                        >
                          {" "}
                          🖤{" "}
                        </button>
                      ) : (
                        <button
                          id="btnu"
                          onClick={() => {
                            deleteLike(element._id, i);
                          }}
                        >
                          ❤️
                        </button>
                      )} */}
                    </div>
                  )}
                  {token.email == element.user.email ? (
                    token.payload.admin ? (
                      ""
                    ) : (
                      <div>
                        <button
                          className="btnprimary"
                          onClick={() => {
                            deletepost(element._id, i);
                          }}
                        >
                          {" "}
                          ❌{" "}
                        </button>
                        <button
                          className="btnprimary"
                          onClick={() => {
                            ChangeToggel();
                          }}
                        >
                          {" "}
                          📝{" "}
                        </button>
                        {toggle == true ? (
                          <div>
                            {" "}
                            <input
                              onChange={(e) => {
                                updaetTextVal(e);
                              }}
                              type="text"
                              placeholder=" Update text "
                            />
                            <button
                              className="btnprimary"
                              onClick={() => {
                                updatePost(element._id);
                              }}
                            >
                              {" "}
                              Update{" "}
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )
                  ) : token.payload.admin ? (
                    <button
                      className="btnprimary"
                      onClick={() => {
                        deletepost(element._id, i);
                      }}
                    >
                      {" "}
                      ❌{" "}
                    </button>
                  ) : (
                    ""
                  )}
                  <br /> <br />
                </div>
              );
            })
          : Posts.map((element, i) => {
              let buttonVar = (
                <button
                  className="btnprimary"
                  onClick={() => {
                    addLike(element._id);
                  }}
                >
                  {" "}
                  🤍{" "}
                </button>
              );

              for (let i = 0; i < like.length; i++) {
                if (like[i]._id == element._id) {
                  buttonVar = (
                    <button
                      id="btnu"
                      onClick={() => {
                        deleteLike(element._id, i);
                      }}
                    >
                      ❤️
                    </button>
                  );
                }
              }

              console.log(element);
              return (
                <div id="onecard" key={element._id}>
                  <b> {element.user.name} ♡</b>
                  <br></br>
                  {element.img && (
                    <img src={element.img} className="card-img-top" alt="..." />
                  )}
                  <p>{element.text}</p>
                  {token.payload.admin ? (
                    ""
                  ) : (
                    <div>{buttonVar}</div>
                    // toggle2 ? (
                    //   <button
                    //     className="btnprimary"
                    //     onClick={() => {
                    //       addLike(element._id);
                    //     }}
                    //   >
                    //     {" "}
                    //     🖤{" "}
                    //   </button>
                    // ) : (
                    //   <button
                    //     id="btnu"
                    //     onClick={() => {
                    //       deleteLike(element._id, i);
                    //     }}
                    //   >
                    //     ❤️
                    //   </button>
                    // )
                  )}
                  {token.email == element.user.email ? (
                    token.payload.admin ? (
                      ""
                    ) : (
                      <div>
                        <button
                          className="btnprimary"
                          onClick={() => {
                            deletepost(element._id, i);
                          }}
                        >
                          {" "}
                          ❌{" "}
                        </button>
                        <button
                          className="btnprimary"
                          onClick={() => {
                            ChangeToggel();
                          }}
                        >
                          {" "}
                          📝{" "}
                        </button>
                        {toggle == true ? (
                          <div>
                            {" "}
                            <input
                              onChange={(e) => {
                                updaetTextVal(e);
                              }}
                              type="text"
                              placeholder=" Update text  "
                            />
                            <button
                              className="btnprimary"
                              onClick={() => {
                                updatePost(element._id);
                              }}
                            >
                              {" "}
                              Update{" "}
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )
                  ) : token.payload.admin ? (
                    <button
                      className="btnprimary"
                      onClick={() => {
                        deletepost(element._id, i);
                      }}
                    >
                      {" "}
                      ❌{" "}
                    </button>
                  ) : (
                    ""
                  )}
                  <br /> <br />
                </div>
              );
            })}
      </div>
    </>
  );
}
