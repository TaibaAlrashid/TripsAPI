
module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define("Trip", {

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
    });

    // SequelizeSlugify.slugifyModel(Trip, { source: ["title"] });
    return Trip;

};