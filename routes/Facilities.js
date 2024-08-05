const express = require("express");
const router = express.Router();
const { Facilities,Levels } = require("../models");
const Sequelize = require('sequelize');

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listoOfFacilties = await Facilities.findAll({
    include: [
      {
       
        model: Levels,
        as: 'Levels',
        attributes: [], // empty array is important here!
       },
    ],
    attributes: [
      'facilityId', [Sequelize.fn("COUNT", Sequelize.col("Levels.Facility_Id")), "total_Levels"] ,'facilityName','fileUrl','No_of_Levels','working_Hrs_From','working_Hrs_To','capacity','facilitylocation','Site_Id'
    ],
    group : ['Facilities.facilityId','Facilities.Site_Id']
  });
  res.status(200).json(listoOfFacilties);

 
  // const listOfPosts = await Sites.findAll({ include: [Likes] });
  // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  // res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:facilityId", async (req, res) => {
  const id = req.params.facilityId;
  const post = await Facilities.findByPk(id);
  res.status(200).json(post);
});
router.get("/bySiteId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfFacilities = await Facilities.findAll({
    where: { Site_Id: id },
  
  })
  res.json(listOfFacilities);
});

router.post("/", async (req, res) => {
  let parsedObj = JSON.parse(req.body.facilityLayout);
  let polygonObj={
    type: 'Polygon',
    coordinates:parsedObj.geometry.coordinates
  }
  const facility ={
    "Site_Id":req.body.siteId,
    "facilityName":req.body.facilityName,
    "fileUrl":req.body.imageUrl?req.body.imageUrl:'https://storagesmartroute27.blob.core.windows.net/filesupload/dummy_Site_png.png',
    "geometry":polygonObj,
   "facilitylocation" : { type: 'Point', coordinates: [req.body.lan, req.body.lat]}
  }

  await Facilities.create(facility);
  res.json(facility);
});
router.put("/updateFacility", async (req, res) => {
  let parsedObj = JSON.parse(req.body.facilityLayout);
  let polygonObj={
    type: 'Polygon',
    coordinates:parsedObj.coordinates
  }
  const { facilityName, facilityId,imageUrl,lan,lat} = req.body;
  await Facilities.update({ facilityName: facilityName,fileUrl:imageUrl,geometry:polygonObj,facilitylocation:{ type: 'Point', coordinates: [lan, lat]}}, { where: { facilityId: facilityId } });
  
  res.json({facilityId: facilityId , facilityName: facilityName,fileUrl:imageUrl,geometry:polygonObj});
});
router.delete("/:facilityId", async (req, res) => {
  const Fid = req.params.facilityId;
  await Facilities.destroy({
    where: {
      facilityId: Fid,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});


module.exports = router;
