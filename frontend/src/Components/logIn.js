import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./login.css";

export default function LogIn({ setToken }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePass = (e) => {
    setPass(e.target.value);
  };
  const logIn = async () => {
    console.log(email,
      pass);
    try {
      const res = await axios.post("/logIn", {
        email,
        pass,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      // حفظ التوكن والرول في لوكل ستوريج
      localStorage.setItem("role", res.data.user.role);
      setToken(res.data.token);

      localStorage.setItem("userId", res.data.user._id);

      // فتح الراوت حسب الرول
      res.data.user.role == "admin"
        ? history.push("/admin-home")
        : history.push("/Movies");
    } catch (err) {}
  };
  return (
    <div className="home">

    <div className="loginbox">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuMj5Jt7LQ0OQSdpmi02mQyidiU5qLDV0o6g&usqp=CAU" className="avater" />
      <h1> LOGIN </h1>
      <label>Email:</label>
      <br />
      <input
        onChange={(e) => {
          changeEmail(e);
        }}
        type="text"
        placeholder="email"
      />
      <br />
      <br />

      <label>password</label>
      <br />

      <input
        onChange={(e) => {
          changePass(e);
        }}
        type="password"
        placeholder="pass"
      />

      <br />
      <br />
      <button
        onClick={() => {
          logIn();
        }}
      >
        logIn
      </button>

      <br />
      <br />
    </div>
    </div>
  );
}
