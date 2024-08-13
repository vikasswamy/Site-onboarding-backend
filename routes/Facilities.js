const express = require("express");
const router = express.Router();
const { Facilities,Levels,Spaces,Devices } = require("../models");
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

});

router.get("/gridDatabySiteId/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch facilities and levels along with their spaces
    const listOfGrid = await Facilities.findAll({
      where: { Site_Id: id },
      include: [
        {
          model: Levels,
          as: 'Levels',
          include: [
            {
              model: Spaces,
              as: 'Spaces'
            }
          ]
        }
      ]
    });

    if (!listOfGrid.length) {
      return res.status(404).json({ error: 'No data found for the given Site ID.' });
    }

    // Fetch devices for each space
    for (const facility of listOfGrid) {
      for (const level of facility.Levels) {
        for (const space of level.Spaces) {
          const devices = await Devices.findAll({
            where: { Space_Id: space.spaceId }
          });
          space.setDataValue('Devices', devices);
        }
      }
    }

    res.status(200).json(listOfGrid);
  } catch (error) {
    console.error('Error fetching grid data:', error.message, error.stack);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
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
