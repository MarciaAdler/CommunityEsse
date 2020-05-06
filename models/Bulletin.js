// Creating our Bulletin model
module.exports = function (sequelize, DataTypes) {
  var Bulletin = sequelize.define("Bulletin", {
    // The message cannot be null
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    show: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "show",
    },
  });

  Bulletin.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Bulletin.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Bulletin;
};
