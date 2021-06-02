'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define(
    'session',
    {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      userId: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.STRING(50000),
    },
    {}
  );
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};
