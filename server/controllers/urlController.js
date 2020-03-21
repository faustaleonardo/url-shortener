const validUrl = require('valid-url');
const shortid = require('shortid');

const models = require('../database/models');

exports.getUrl = async (req, res) => {
  const { code } = req.params;

  const shortUrl = await models.Shorturl.findOne({ where: { urlCode: code } });

  if (!shortUrl) return res.status(404).json('Url code not found!');

  const { ip } = req.ipInfo;
  const refererUrl = req.headers.referer;

  shortUrl.clicks += 1;
  await shortUrl.save();

  if (refererUrl) {
    const track = await models.Track.findOne({
      where: { ipAddress: ip, refererUrl }
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
  const { url, title } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl))
    return res.status(401).json('Invalid base url!');

  if (!validUrl.isUri(url)) return res.status(401).json('Invalid long url!');

  try {
    let item = await models.Shorturl.findOne({ where: { url } });

    if (item) return res.status(200).json(item);

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    // CHANGE TO AUTH USER
    const userId = 1;

    item = await models.Shorturl.create({
      title,
      urlCode,
      shortUrl,
      url,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error!');
  }
};

exports.getTrack = (req, res) => {
  return res.status(200).json('You have accessed protected route');
};
