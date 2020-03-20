const models = require('../database/models');
const validUrl = require('valid-url');
const shortid = require('shortid');

exports.getUrl = async (req, res) => {
  const { code } = req.params;

  const item = await models.Shorturl.findOne({ where: { urlCode: code } });

  if (!item) return res.status(404).json('Url code not found!');

  return res.redirect(item.url);
};

exports.postUrl = async (req, res) => {
  const { url, title } = req.body;
  const baseUrl = 'http://localhost:5000';

  if (!validUrl.isUri(baseUrl))
    return res.status(401).json('Invalid base url!');

  if (!validUrl.isUri(url)) return res.status(401).json('Invalid long url!');

  try {
    let item = await models.Shorturl.findOne({ where: { url } });

    if (item) return json.status(200).json(item);

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    // CHANGE THIS AFTER IMPLEMENT AUTHENTICATION
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
