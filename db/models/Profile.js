const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    totalTripsNumber: {
      type: DataTypes.INTEGER,
    },
  });

  SequelizeSlugify.slugifyModel(Profile, { source: ["name"] });
  return Profile;
};
