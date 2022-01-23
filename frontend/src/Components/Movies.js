import React, { useState, useEffect } from "react";
import { link, useHistory, useParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { refresh } from "react-icons/ri";
import Btns from "./cardAction";

import axios from "axios";
import "./movies.css";
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
    const res = await axios.get("https://heroku-dep-raghad.herokuapp.com/movies", {
      headers: { authorization: "Bearer " + token },
      // useEffect نستدعيها مرا وحده الي هي يوم نعمل ل Commponet init  بحيث يجيب البيانات من Api
    });
    setrole(_role);
    // console.log("jjjjj");

    setmovies(res.data);
  }, []);

  useEffect(async () => {
    if (token) {
      const Fav = await axios.get("https://heroku-dep-raghad.herokuapp.com/movies", {
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
      `https://heroku-dep-raghad.herokuapp.com/${id}`,

      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    console.log(deleteMovies.data);

    const copiedArr = [...movies];
    copiedArr.splice(index, 1);
    setmovies(copiedArr);
  };

  const gotmovies = async (id) => {
    console.log(id);
    history.push(`/Comment/${id}`);
  };

  const toggleColor = async (id) => {
    try {
      const res = await axios.post(
        `https://heroku-dep-raghad.herokuapp.com/Favorit/${id}`,
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
      `https://heroku-dep-raghad.herokuapp.com/updet`,
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
      <h1 className="ggggg">Random Movies</h1>
      <div className="row justify-content-center ">
        {movies &&
          movies.map((elem, i) => (
            <div className="col-lg-4 col-md-4 col-6 card p-2 shadow-lg" key={i}>
              <div onClick={() => gotmovies(elem._id)}>
                <div className="card-title">
                  <h1 className="fs-4 text-white">{elem.name}</h1>
                </div>
                <div className="card-image">
                  <img src={elem.img} />
                </div>
              </div>
              <div class="card-btns">
                <Btns
                  userRole={role}
                  cardData={elem}
                  changeName={changename}
                  deleteMovie={deleteMovies}
                  indexMe={i}
                  toggleColor={toggleColor}
                  updatenam={updatenam}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
