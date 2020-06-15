// Creating our Announcement model
module.exports = function (sequelize, DataTypes) {
  var Announcement = sequelize.define("Announcement", {
    // The message cannot be null
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    show: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "show",
    },
  });

  Announcement.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Announcement.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Announcement.belongsTo(models.User, {
      foreignKey: "PropertyId",
      as: "Property",
    });
  };

  return Announcement;
};
