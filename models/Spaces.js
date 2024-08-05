module.exports = (sequelize, DataTypes) => {
    const Spaces = sequelize.define("Spaces", {
      spaceId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      spaceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spaceType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    
    });
  
    Spaces.associate = (models) => {
      Spaces.belongsTo(models.Facilities,{
        foreignKey: "Facility_Id",
        as:'Facilities',
        onDelete: "cascade",
      });
        Spaces.belongsTo(models.Levels,{
        foreignKey: "Level_Id",
        as:'Levels',
        onDelete: "cascade",
      });
      Spaces.belongsTo(models.Sites,{
        foreignKey: "Site_Id",
        as:'Sites',
        onDelete: "cascade",
      });
      //   Spaces.hasMany(models.Devices, {
      //     foreignKey:'Space_Id',
      //     as : 'Devices',
      //   onDelete: "cascade",
      // });
    
    };
    return Spaces;
  };
  