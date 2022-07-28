// global variables
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const app = express();

// handlebars / template of choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// This uses Heroku's process.env.PORT value when deployed and 3001 when run locally.
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// grabs public folder and makes it readily available to server
app.use(express.static(path.join(__dirname, 'public')));

// turn on connection to db and server, force: true if you want to wipe data
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});