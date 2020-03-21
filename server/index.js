const express = require('express');
const morgan = require('morgan');
const expressIp = require('express-ip');
const cors = require('cors');
const passport = require('passport');
const { sequelize } = require('./database/models');

const app = express();
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();
require('./services/passport');

const port = 5000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(expressIp().getIpInfoMiddleware);
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/', urlRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
