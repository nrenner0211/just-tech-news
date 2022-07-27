const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();

// This uses Heroku's process.env.PORT value when deployed and 3001 when run locally.
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
// By forcing the sync method to true, we will make the tables re-create if there are any association changes. However this is not usually necessary
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});