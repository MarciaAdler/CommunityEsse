// Creating our Property model
module.exports = function (sequelize, DataTypes) {
  var Property = sequelize.define("Property", {
    // The name cannot be null
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    street_address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Property;
};
