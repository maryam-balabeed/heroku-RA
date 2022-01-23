import React, { useState, useEffect } from "react";
import { link, useHistory, useParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { refresh } from "react-icons/ri";

import axios from "axios";
export default function Movies({ token }) {
  const [movies, setmovies] = useState([]);
  const [Favorit, setFavorit] = useState("");
  // const [video, setvideo] = useState("");

  const [element, setelement] = useState("");
  // const {id} = useParams();
  // علشان نخزن قيمة state الجديده
  const [searchArr, setSearchArr] = useState("");
  const [role, setrole] = useState(null);
  const history = useHistory();
  const { id } = useParams();
  const [inputNameMovie, setInputNameMovie] = useState("");
  useEffect(async () => {


    // عشان ناخذ التوكن اما من الصفحه الي قبلها او من اللوكل ستوريج
    const _role = localStorage.getItem("role");

    // اليوزر ياخذه من الصفحه الي قبل اما الادمن
    // ياخذ من الوكل ستوريج
    const res = await axios.get("/movies", {
      headers: { authorization: "Bearer " + token },
      // useEffect نستدعيها مرا وحده الي هي يوم نعمل ل Commponet init  بحيث يجيب البيانات من Api
    });
    setrole(_role);
    // console.log("jjjjj");

    setmovies(res.data);
  }, []);

  useEffect(async () => {
    if (token) {
      const Fav = await axios.get("/movies", {
        headers: { authorization: "Bearer " + token },
      });
      setFavorit(Fav.data);
      console.log(Fav.data, "ffffff");
    }
  }, []);

  const searchTarget = (e) => {
    setSearchArr(e.target.value);
  };
  const search = () => {
    const search1 = movies.filter((elm) => {
      if (elm.name.toLowerCase().includes(searchArr.toLocaleLowerCase())) {
        return elm;
      }
    });
    setmovies(search1);
  };

  const deleteMovies = async (id, index) => {
    console.log(id);
    const deleteMovies = await axios.delete(
      `/movies/${id}`,

      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(deleteMovies.data);

    const copiedArr = [...movies];
    copiedArr.splice(index, 1);
    setmovies(copiedArr);
  };
  console.log("kkkkkk");

  const gotmovies = async (id) => {
    console.log(id);
    history.push(`/Comment/${id}`);
  };

  const toggleColor = async (id) => {
    try {
      const res = await axios.post(
        `/Favorit/${id}`,
        {},
        { headers: { authorization: "Bearer " + token } }
      );

      //  setFavorit([...res.data])

      console.log(res.data, "kkk");
    } catch (e) {
      console.log(e);
    }
  };

  const changename = (e) => {
    setInputNameMovie(e.target.value);
  };

  const updatenam = async (id, i) => {
    console.log(id);
    const updateMovies = await axios.put(
      `/updet`,
      {
        id: id,
        newName: inputNameMovie,
      },

      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    // console.log(deleteMovies.data);

    setmovies(updateMovies.data);
  };

  return (
    <div className="div1">
      <div className="Search">
        <input
          type="text"
          onChange={(e) => {
            searchTarget(e);
          }}
        />
        <button
          onClick={() => {
            search();
          }}
        >
          <BsSearch />
        </button>
      </div>
      <h1>Random Movies</h1>
      <div className="all-moves-here">
        {movies &&
          movies.map((elem, i) => {
            console.log(elem);
            return (
              <div className="moviessss">
                <div class="movie-img" key={i}>
                  <p className="text">{elem.description}</p>
                  <br />
                  <br />
                  <img
                    className="movdiv"
                    onClick={() => {
                      gotmovies(elem._id);
                    }}
                    src={elem.img}
                    alr="no img"
                  />

                  <p className="name">{elem.name}</p>

                  <div className="NNNNN">
                    {role && role == "admin" ? (
                      <button
                        className="BOUT"
                        onClick={() => {
                          updatenam(elem._id);
                        }}
                      >
                        bb
                      </button>
                    ) : null}
                    <button
                      className="FcLike"
                      onClick={() => {
                        toggleColor(elem._id);
                      }}
                    >
                      <FcLike />
                    </button>

                    {role && role == "admin" ? (
                      //علشان يشيك هل هو ادم او يوزر
                      <button
                        className="BOUTN"
                        onClick={() => {
                          deleteMovies(elem._id, i);
                        }}
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    ) : null}

                    {role && role == "admin" ? (
                      <input
                        className="inpout"
                        onChange={(e) => {
                          changename(e);
                        }}
                        type="text"
                        placeholder="name"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
