const requireLogin = (req, res, next) => {
  if (!req.user) return res.status(401).json('You need to login');
  next();
};

module.exports = requireLogin;
