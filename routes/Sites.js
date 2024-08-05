const express = require("express");
const router = express.Router();
const { Sites,Facilities } = require("../models");
const Sequelize = require('sequelize');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
 const listoOfSites = await Sites.findAll(
    {
      include: [
        {
         
          model: Facilities,
          as: 'Facilities',
          attributes: [], // empty array is important here!
         },
      ],
      attributes: [
        'siteId', [Sequelize.fn("COUNT", Sequelize.col("Facilities.Site_Id")), "total_Facilities"] ,'siteName','fileUrl','location'
      ],
      group : ['Sites.siteId']
    //   include: [
    //    {
    //      model: Facilities,
    //      as: 'Facilities',
    //      attributes: [
    //        [[Sequelize.fn("COUNT", Sequelize.col("Facilities.Site_Id")), "totalFacilities"]] 
    //      ],
       
    //    },
    //  ],
    }
  );
  res.status(200).json(listoOfSites)
  // const listOfPosts = await Sites.findAll({ include: [Likes] });
  // const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  // res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});
router.get('/facility-grid-Data',async (req,res)=>{
  let grid = [];
  const gridData = await Sites.findAll(
    {
      include: [{
        model: Facilities,
        as:'Facilities'
    }]
    //   include: [
    //    {
    //      model: Facilities,
    //      as: 'Facilities',
    //      attributes: [
    //        [[Sequelize.fn("COUNT", Sequelize.col("Facilities.Site_Id")), "totalFacilities"]] 
    //      ],
       
    //    },
    //  ],
    }
  ).then(grandparents => {
   
    res.status(200).json(grandparents)
  });
 
})
router.get("/byId/:siteId", async (req, res) => {
  const id = req.params.siteId;
  const post = await Sites.findByPk(id);

  res.status(200).json(post);
});

// router.get("/byuserId/:id", async (req, res) => {
//   const id = req.params.id;
//   const listOfPosts = await Posts.findAll({
//     where: { UserId: id },
//     include: [Likes],
//   });
//   res.json(listOfPosts);
// });

router.post("/", async (req, res) => {
  const post ={
    "siteName":req.body.siteName,
    "fileUrl" :req.body.fileUrl?req.body.fileUrl:'https://storagesmartroute27.blob.core.windows.net/filesupload/dummy_Site_png.png',
    "siteAddress":req.body.siteAddress,
    "siteTimeZone":req.body.siteTimeZone,
   "location" : { type: 'Point', coordinates: [req.body.lan, req.body.lat]}
  }
  
  console.log(post,"::::body:::");
  await Sites.create(post);
  res.json(post);
});

// router.put("/title", validateToken, async (req, res) => {
//   const { newTitle, id } = req.body;
//   await Posts.update({ title: newTitle }, { where: { id: id } });
//   res.json(newTitle);
// });

// router.put("/postText", validateToken, async (req, res) => {
//   const { newText, id } = req.body;
//   await Posts.update({ postText: newText }, { where: { id: id } });
//   res.json(newText);
// });

// router.delete("/:postId", validateToken, async (req, res) => {
//   const postId = req.params.postId;
//   await Posts.destroy({
//     where: {
//       id: postId,
//     },
//   });

//   res.json("DELETED SUCCESSFULLY");
// });

module.exports = router;
