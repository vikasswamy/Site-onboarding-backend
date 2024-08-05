module.exports = (sequelize, DataTypes) => {
    const Devices = sequelize.define("Devices", {
      deviceId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      deviecSourceId:{
        type: DataTypes.UUID,
        allowNull: false,
      },
      deviceType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceTypeId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isBasic:{
        type:DataTypes.BOOLEAN,
        allowNull: true,
      },
      isAdvance:{
        type:DataTypes.BOOLEAN,
        allowNull: true,
      },
      Site_Id:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      Facility_Id:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      Level_Id:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      Space_Id:{
        type: DataTypes.STRING,
        allowNull: true,
      }
    
    });
    
    // Devices.associate = (models) => {
    //     Devices.belongsTo(models.Sites,{
    //         foreignKey: "Site_Id",
    //         as:'Sites',
    //         onDelete: "cascade",
    //       });
    //       Devices.belongsTo(models.Facilities,{
    //         foreignKey: "Facility_Id",
    //         as:'Facilities',
    //         onDelete: "cascade",
    //       });
    //       Devices.belongsTo(models.Levels,{
    //         foreignKey: "Level_Id",
    //         as:'Levels',
    //         onDelete: "cascade",
    //       });
    //       Devices.belongsTo(models.Spaces,{
    //         foreignKey: "Space_Id",
    //         as:'Spaces',
    //         onDelete: "cascade",
    //       });
   
    // }
    
     

    return Devices;
  };
  