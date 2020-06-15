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
  File.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    File.belongsTo(models.Property, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return File;
};
