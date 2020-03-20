'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    'Track',
    {
      shorturlId: DataTypes.STRING,
      ipAddress: DataTypes.STRING,
      referrelUrl: DataTypes.STRING
    },
    {}
  );
  Track.associate = function(models) {
    Track.belongsTo(models.Shorturl, {
      foreignKey: 'shorturlId',
      as: 'shorturl'
    });
  };
  return Track;
};
