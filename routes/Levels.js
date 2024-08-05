const express = require("express");
const router = express.Router();
const { Levels,Spaces,Devices } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");
const { where } = require("sequelize");
router.get("/", async (req, res) => {
  const listoOfLevels= await Levels.findAll();
  res.json(listoOfLevels)

});
router.get("/byFacility/:id", async (req, res) => {
  const id = req.params.id;
  const listOfLevels = await Levels.findAll({
    where: { Facility_Id: id },
  
  })
  res.json(listOfLevels);
});

router.get("/gridDatabyFacilityId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    // Fetch levels along with their spaces
    const listOfLevels = await Levels.findAll({
      where: { Facility_Id: id },
      include: [
        {
          model: Spaces,
          as: 'Spaces'
        }
      ]
    });

    // Fetch devices for each space
    for (const level of listOfLevels) {
      for (const space of level.Spaces) {
        const devices = await Devices.findAll({
          where: { Space_Id: space.spaceId }
        });
        space.setDataValue('Devices', devices); // Dynamically add the devices to the space
      }
    }

    res.status(200).json(listOfLevels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("byId/:levelId", async (req, res) => {
  const id = req.params.levelId;
  const post = await Levels.findByPk(id);
  res.json(post);
});

router.get("/byFacility/:id/byLevelName/:levelName", async (req, res) => {
  const fId = req.params.id;
  const Name = req.params.levelName;
  const listOfLevels = await Levels.findAll({
    where: { levelName: Name ,  Facility_Id: fId }
  });
  res.json(listOfLevels);
});

router.post("/", async (req, res) => {
  const level ={
    "Site_Id":req.body.Site_Id,
    "Facility_Id":req.body.Facility_Id,
    "levelName":req.body.levelName,
    "capacity":req.body.capacity?req.body.capacity:0,
    "max_capacity":req.body.max_capacity?req.body.max_capacity:0,
    "pdfFileUrl":req.body.pdfFileUrl?req.body.pdfFileUrl:'',
    "FloorPlanImageUrl":req.body.FloorPlanImageUrl?req.body.FloorPlanImageUrl:'',
    "Geojsonfile":req.body.Geojsonfile?req.body.Geojsonfile:''
  }
  await Levels.create(level);
  res.json(level);
});


router.put("/updateLevel", async (req, res) => {
  const { levelName, levelId,FloorPlanImageUrl,Geojsonfile} = req.body;
  await Levels.update({ levelName: levelName,FloorPlanImageUrl:FloorPlanImageUrl,Geojsonfile:Geojsonfile}, { where: { levelId: levelId } });
  res.json({ levelName: levelName, levelId: levelId,FloorPlanImageUrl:FloorPlanImageUrl,Geojsonfile:Geojsonfile});
});

router.delete("/:levelId", async (req, res) => {
  const levelId = req.params.levelId;
  await Levels.destroy({
    where: {
      levelId: levelId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
