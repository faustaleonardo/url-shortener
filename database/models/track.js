'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    'Track',
    {
      shorturlId: DataTypes.STRING,
      ipAddress: DataTypes.STRING,
      refererUrl: DataTypes.STRING
    },
    {}
  );
  Track.associate = function(models) {
    Track.belongsTo(models.Shorturl, {
      foreignKey: 'shorturlId',
      targetKey: 'id',
      as: 'shorturl'
    });
  };
  return Track;
};
