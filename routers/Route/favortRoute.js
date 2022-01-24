const express = require("express");
const { adminAuth } = require("../Controler/Admain");
const favortRoute = express.Router();

const {  getFavorit, addFavorit} = require("../Controler/Favorit");
const { authentication } = require("../midlleWare/authentication");


favortRoute.get("/Favorit",authentication, getFavorit);
favortRoute.post("/Favorit/:id",authentication, addFavorit);



module.exports = favortRoute;