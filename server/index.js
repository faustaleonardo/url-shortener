const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./database/models');

const app = express();
const urlRoutes = require('./routes/urlRoutes');

const port = 5000;

app.use(morgan('combined'));
app.use(express.json());

app.use('/api/v1/urls', urlRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
