'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shorturl = sequelize.define(
    'Shorturl',
    {
      urlCode: DataTypes.STRING,
      shortUrl: DataTypes.STRING,
      url: DataTypes.TEXT,
      clicks: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Shorturl.associate = function (models) {
    Shorturl.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      as: 'user',
    });
  };
  return Shorturl;
};
