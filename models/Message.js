// Creating our Message model
module.exports = function (sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    // The message cannot be null
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      defaultValue: "NULL",
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    show: {
      type: DataTypes.STRING,
      defaultValue: "show",
    },
    inboxShow: {
      type: DataTypes.STRING,
      defaultValue: "show",
    },
  });
  Message.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Message.belongsTo(models.User, {
      foreignKey: "SenderId",
      as: "Sender",
    });
    Message.belongsTo(models.User, {
      foreignKey: "ReceiverId",
      as: "Receiver",
    });
  };

  return Message;
};
