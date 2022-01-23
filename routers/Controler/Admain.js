const moviesModels = require ("../../db/models/moviesModels");
const userModel = require("../../db/models/userModel");


exports.adminAuth = async (req,res , next) => {

  const {userId} = req.body;
   // ناخذ اليوزر id من البودي 
  const user = await userModel.findById(userId)
   // علشان يجيب بيانات اليوزر عشان نعرف هل هو ادمن او لا
  if(user && user.role == 'admin') return next();

  res.status(401).json("You are not allowed to post a movie");
}


