// Creating our Bulletin model
module.exports = function (sequelize, DataTypes) {
  var Maintenance = sequelize.define("Maintenance", {
    // The message cannot be null
    request: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    show: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "show",
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  });

  Maintenance.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Maintenance.belongsTo(models.User, {
      foreignKey: "SenderId",
      as: "Sender",
    });
    Maintenance.belongsTo(models.User, {
      foreignKey: "ReceiverId",
      as: "Receiver",
    });
    Maintenance.belongsTo(models.User, {
      foreignKey: "PropertyId",
      as: "Property",
    });
  };

  return Maintenance;
};
