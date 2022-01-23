const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
require("./db/db");
app.use(express.json());
app.use(cors());
const path = require("path");


const moviesRoute = require("./routers/Route/moviesRoute");
const sinUpRoute = require("./routers/Route/sinUpRoute");
const logInRoute = require("./routers/Route/logInRoute");
const favortRoute = require("./routers/Route/favortRoute");


app.use(moviesRoute);
app.use(favortRoute);

app.use(sinUpRoute);
app.use(logInRoute);



app.use('/', express.static(path.join(__dirname, '/frontend/build')));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

app.listen(process.env.PORT || 3001, () => {
  console.log("app work");
  if (process.env.NODE_ENV === "test") app.set("port", 3001);
  else app.set("port", process.env.PORT || 3000);
});

// const PORT = process.env.PORT || 3001;
// app.listen(PORT);


// console.log(process.env.PORT)
// app.listen(process.env.PORT, ()=>{
//     console.log("server is on");
// });
