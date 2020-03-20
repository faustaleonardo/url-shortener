'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shorturl = sequelize.define(
    'Shorturl',
    {
      title: DataTypes.STRING,
      urlCode: DataTypes.STRING,
      shortUrl: DataTypes.STRING,
      url: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Shorturl.associate = function(models) {
    Shorturl.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Shorturl;
};
