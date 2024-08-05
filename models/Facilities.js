module.exports = (sequelize, DataTypes) => {
    const Facilities = sequelize.define("Facilities", {
      facilityId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      facilityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileUrl:{
        type: DataTypes.STRING,
        allowNull: true
      },
      // No_of_Levels: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // working_Hrs_From: {
      //   type: DataTypes.TIME,
      //   allowNull: false,
      // },
      // working_Hrs_To: {
      //   type: DataTypes.TIME,
      //   allowNull: false,
      // },
      // capacity: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      geometry:{
        type: DataTypes.GEOMETRY("POLYGON"),
        allowNull: false,
      },
      facilitylocation: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
      },
     
    });
  
    Facilities.associate = (models) => {
     
        Facilities.hasMany(models.Levels, {
          foreignKey:'Facility_Id',
          as : 'Levels',
        onDelete: "cascade",
      });
      Facilities.hasMany(models.Spaces, {
        foreignKey:'Facility_Id',
        as : 'Spaces',
      onDelete: "cascade",
    });
  //   Facilities.hasMany(models.Devices, {
  //     foreignKey:'Facility_Id',
  //     as : 'Devices',
  //   onDelete: "cascade",
  // });

  Facilities.belongsTo(models.Sites,{
    foreignKey: "Site_Id",
    as:'Sites',
    onDelete: "cascade",
  });
     
    };
    return Facilities;
  };
  