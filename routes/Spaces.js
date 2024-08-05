const express = require("express");
const router = express.Router();
const { Spaces,Devices } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listoOfSpaces= await Spaces.findAll();
  res.json(listoOfSpaces)
 
});

router.get("/byId/:levelId", async (req, res) => {
  const id = req.params.levelId;
  console.log(id,"paramsId")
  const spaces = await Spaces.findAll({
        where: { Level_Id: id }
      });
  res.json(spaces);
});



router.post("/", async (req, res) => {
  console.log(":::::::",req.body,"SpacesPayloads:::::")
  await Spaces.bulkCreate(req.body);
  res.json(req.body);
}); 



router.put("/updateSpace", async (req, res) => {
  const { spaceName, spaceId } = req.body;
  console.log(req.body,"::::update Space:::::");
  await Spaces.update({ spaceName: spaceName }, { where: { spaceId: spaceId } });
  res.json(spaceName);
});

router.delete("/:spaceId", async (req, res) => {
  const reqspaceId = req.params.spaceId;
  await Spaces.destroy({
    where: {
      spaceId: reqspaceId,
    },
  });

  res.json(`${reqspaceId} DELETED SUCCESSFULLY`);
});
router.delete("/deleteAllSpaceFormLevel/:levelId", async (req, res) => {
  const levelId = req.params.levelId;
  await Spaces.destroy({
    where: {
      Level_Id: levelId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
