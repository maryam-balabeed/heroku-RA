const FavoriteModel = require("../../db/models/FavoriteModel");
const moviesModels = require ("../../db/models/moviesModels");


const getFavorit = async (req, res) => {
    const userId = req.token.userId;
    const id = req.params.id
  
    try {
      const likemovies = await FavoriteModel.find({  userId: userId }).populate("moviesId")

        res.send(likemovies);
    } catch (error) {
      res.send(error);
    }
  };
  
  // console.log("like");

  const addFavorit = async (req, res) => {
    const id = req.params.id;
    const user = req.token.userId;

    const isFav = await FavoriteModel.findOne({userId : user, moviesId:id})
    if (isFav) {
      
      await FavoriteModel.findOneAndDelete({userId : user, moviesId:id})
      const like = await FavoriteModel.find({userId:user}).populate("userId").populate("moviesId");
      res.status(201).json(like)

    }else{

      const newFav = new FavoriteModel({userId : user, moviesId:id})
      try{
        await newFav.save()
        const like = await FavoriteModel.find({userId:user}).populate("userId").populate("moviesId");
        res.status(201).json(like)
        
      }catch(err){
        res.send({err})
      }

    }

   
  }

  // const getFavorit = async (req, res) => {
  //   const userId = req.token.userId;
  //   const id = req.params.id
  
  //   try {
  //     const likemovies = await FavoriteModel.save({ _id: id, user: userId }).populate("user");
  
  //       res.send(likemovies);
  //   } catch (error) {
  //     res.send(error);
  //   }
  // };
  
  module.exports = {  getFavorit, addFavorit };
 