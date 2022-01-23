const express = require("express");
const app = express();
require('dotenv').config()
const cors = require("cors");
require("./db/db");
app.use(express.json());
app.use(cors());
const path = require("path");
const PORT = process.env.PORT || 5000;


const moviesRoute = require("./routers/Route/moviesRoute");
const sinUpRoute = require("./routers/Route/sinUpRoute");
const logInRoute = require("./routers/Route/logInRoute");
const favortRoute = require("./routers/Route/favortRoute");


app.use(moviesRoute);
app.use(favortRoute);

app.use(sinUpRoute);
app.use(logInRoute);




// app.listen(process.env.PORT || 5000, () => {
//   console.log("app work");
//   if (process.env.NODE_ENV === "production") {
//     // app.set(PORT, 3001);
//     app.use("/", express.static(path.join(__dirname, "/frontend/build")));
//     app.get("*", (req, res) => {
//       console.log(path.resolve(__dirname, "frontend/build/index.html"));
//       res.sendFile(path.resolve(__dirname + "/frontend/build", "index.html"));
//     });
//   } else app.set(PORT, process.env.PORT || 5000);
// });

var port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 5000");
});

// const PORT = process.env.PORT || 3001;
// app.listen(PORT);


// console.log(process.env.PORT)
// app.listen(process.env.PORT, ()=>{
//     console.log("server is on");
// });
