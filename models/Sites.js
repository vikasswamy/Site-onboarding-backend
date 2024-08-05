module.exports = (sequelize, DataTypes) => {
    const Sites = sequelize.define("Sites", {
      siteId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      siteName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      siteAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      siteTimeZone:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileUrl:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
      },
    
    });
  
    Sites.associate = (models) => {
      Sites.hasMany(models.Facilities, {
        foreignKey: "Site_Id",
        as:'Facilities',
        onDelete: "cascade",
      });
      Sites.hasMany(models.Levels, {
        foreignKey: "Site_Id",
        as:'Levels',
        onDelete: "cascade",
      });
      Sites.hasMany(models.Spaces, {
        foreignKey: "Site_Id",
        as:'Spaces',
        onDelete: "cascade",
      });
      // Sites.hasMany(models.Devices, {
      //   foreignKey: "Site_Id",
      //   as:'Devices',
      //   onDelete: "cascade",
      // });
    }

    
    return Sites;
  };
  