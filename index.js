const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(cors());

const db = require("./models");


const siteRouter = require("./routes/Sites");
app.use("/Sites", siteRouter);
const faciltyeRouter = require("./routes/Facilities");
app.use("/Facilities", faciltyeRouter);
const levelRoutes = require("./routes/Levels.js");
app.use("/Levels", levelRoutes);
const spaceRoutes = require("./routes/Spaces");
app.use("/Spaces", spaceRoutes);
const deviceRoutes = require("./routes/Devices");
app.use("/Devices", deviceRoutes);
// const masterdata = require("./routes/masterdata");
// app.use("/masterdata", masterdata);
const PORT =process.env.PORT || 3001
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
});
