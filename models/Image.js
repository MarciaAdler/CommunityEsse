// Creating our Announcement model
module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    // The message cannot be null
    image: {
      type: DataTypes.BLOB("Long"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Image.associate = function (models) {
    // We're saying that a Image should belong to an User
    // An Image can't be created without a User due to the foreign key constraint
    Image.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Image;
};
