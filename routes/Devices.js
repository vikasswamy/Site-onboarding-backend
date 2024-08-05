const express = require("express");
const router = express.Router();
const { Devices } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listoOfDevices= await Devices.findAll();
  res.json(listoOfDevices)
  // const listOfPosts = await Sites.findAll({ include: [Likes] });
  // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  // res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/byId/:spaceId", async (req, res) => {
  const id = req.params.deviceId;
  const post = await Devices.findAll({
        where: { Space_Id: id },
        
      });
  res.json(post);
});
router.post("/", async (req, res) => {
  console.log(req.body,":::req.body:::")
    const device ={
        "Site_Id":req.body.Site_Id?req.body.Site_Id:'',
        "Facility_Id":req.body.Facility_Id?req.body.Facility_Id:'',
        "Level_Id":req.body.Level_Id?req.body.Level_Id:'',
        "Space_Id":req.body.Space_Id?req.body.Space_Id:'',
        "deviceType":req.body.deviceType,
        'deviceTypeId':req.body.deviceTypeId,
        'isBasic':req.body.deviceModel=='Basic'?true:false,
        'isAdvance':req.body.deviceModel!=='Basic'?true:false,
        "deviecSourceId":req.body.deviecSourceId,
      }

  await Devices.create(device);
  res.json(device);
});

router.put("/updatedevice", async (req, res) => {
  const { Space_Id,Facility_Id,Level_Id,Site_Id, deviceId } = req.body;

  await Devices.update({ Space_Id: Space_Id, Facility_Id:Facility_Id,Level_Id:Level_Id,Site_Id:Site_Id}, { where: { deviceId: deviceId } });
  res.json({ Space_Id: Space_Id, Facility_Id:Facility_Id,Level_Id:Level_Id,Site_Id:Site_Id,deviceId: deviceId});
});


router.delete("/:deviceId",  async (req, res) => {
  const deviceId = req.params.deviceId;
  await Devices.destroy({
    where: {
      deviceId: deviceId,
    },
  });

  res.json({
    deviceId:deviceId,
    message:'Deleted Successfully'
  });
});

module.exports = router;
