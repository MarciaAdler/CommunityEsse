// Creating our Bulletin model
module.exports = function (sequelize, DataTypes) {
  var Notification = sequelize.define("Notification", {
    // The message cannot be null
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    show: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "show",
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Notification.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Notification.belongsTo(models.User, {
      foreignKey: "SenderId",
      as: "Sender",
    });
    Notification.belongsTo(models.User, {
      foreignKey: "ReceiverId",
      as: "Receiver",
    });
  };

  return Notification;
};
