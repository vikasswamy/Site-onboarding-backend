const express = require("express");
const router = express.Router();
const { Sites,Facilities,Levels,Spaces,Devices } = require("../models");

const Sequelize = require('sequelize');

router.get("/", async (req, res) => {
//   const listoOfFacilties = await Facilities.findAll({
    
//   });
  res.status(200).json(listoOfFacilties);

 
  // const listOfPosts = await Sites.findAll({ include: [Likes] });
  // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  // res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});



