// Creating our Announcement model
module.exports = function (sequelize, DataTypes) {
  var File = sequelize.define("File", {
    // The message cannot be null
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    show: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "show",
    },
  });

  return File;
};
