module.exports = (sequelize, DataTypes) => {
    const Levels = sequelize.define("Levels", {
      levelId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      levelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max_capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pdfFileUrl:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      FloorPlanImageUrl:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      Geojsonfile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    
    });
  
    Levels.associate = (models) => {
        Levels.belongsTo(models.Facilities,{
        foreignKey: "Facility_Id",
        as:'Facilities',
        onDelete: "cascade",
      });
      Levels.belongsTo(models.Sites,{
        foreignKey: "Site_Id",
        as:'Sites',
        onDelete: "cascade",
      });
      Levels.hasMany(models.Spaces, {
        foreignKey:'Level_Id',
        as : 'Spaces',
      onDelete: "cascade",
    });
  //   Levels.hasMany(models.Devices, {
  //     foreignKey:'Level_Id',
  //     as : 'Devices',
  //   onDelete: "cascade",
  // });
  
    };
    return Levels;
  };
  