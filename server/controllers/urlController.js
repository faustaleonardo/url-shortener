const validUrl = require('valid-url');
const shortid = require('shortid');

const { QueryTypes } = require('sequelize');
const models = require('../database/models');
const { sequelize } = require('../database/models');

exports.getUrl = async (req, res) => {
  const { code } = req.params;

  const shortUrl = await models.Shorturl.findOne({ where: { urlCode: code } });

  if (!shortUrl)
    return res.status(404).json({
      status: 'fail',
      message: 'Url code not found!'
    });

  const { ip } = req.ipInfo;
  const refererUrl = req.headers.referer;

  shortUrl.clicks += 1;
  await shortUrl.save();

  if (refererUrl) {
    const track = await models.Track.findOne({
      where: { ipAddress: ip, refererUrl, shorturlId: shortUrl.id }
    });
    if (track) {
      track.updatedAt = new Date();
      await track.save();
    } else {
      await models.Track.create({
        ipAddress: ip,
        refererUrl,
        shorturlId: shortUrl.id
      });
    }
  }

  return res.redirect(shortUrl.url);
};

exports.postUrl = async (req, res) => {
  const { url } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl))
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid base url!'
    });

  if (!validUrl.isUri(url))
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid long url!'
    });

  try {
    let item = await models.Shorturl.findOne({ where: { url } });

    if (item) {
      return res.status(200).json({
        status: 'success',
        data: {
          item
        }
      });
    }

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/api/${urlCode}`;

    // 1 indicates anonymous
    let userId = 1;
    if (req.user) userId = req.user.id;

    item = await models.Shorturl.create({
      urlCode,
      shortUrl,
      url,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return res.status(200).json({
      status: 'success',
      data: {
        item
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Server error!'
    });
  }
};

exports.patchUrl = async (req, res) => {
  const { urlId } = req.params;
  const { customUrlCode } = req.body;

  try {
    let item = await models.Shorturl.findByPk(urlId);

    const baseUrl = process.env.BASE_URL;
    const shortUrl = `${baseUrl}/api/${customUrlCode}`;
    const urlCode = customUrlCode;

    item.urlCode = urlCode;
    item.shortUrl = shortUrl;
    await item.save();

    return res.status(200).json({
      status: 'success',
      data: {
        item
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Server error!'
    });
  }
};

exports.getTrack = async (req, res) => {
  const shorturlId = req.params.urlId;

  const tracks = await models.Track.findAll({
    where: { shorturlId }
  });

  return res.status(200).json({
    status: 'success',
    data: {
      tracks
    }
  });
};

exports.getHistory = async (req, res) => {
  const shorturls = await models.Shorturl.findAll({
    where: { userId: req.user.id }
  });

  return res.status(200).json({
    status: 'success',
    data: {
      shorturls
    }
  });
};

exports.getStats = async (req, res) => {
  const { group } = req.query;

  console.log(group);

  const result = await sequelize.query(
    `select extract(${group} from "createdAt") as created_month, count(*) from public."Shorturls" where "userId"=${req.user.id} group by created_month order by created_month`,
    { type: QueryTypes.SELECT }
  );

  return res.status(200).json({
    status: 'success',
    data: {
      result
    }
  });
};
