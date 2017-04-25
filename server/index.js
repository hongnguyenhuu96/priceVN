const getPhoneFromFpt = require('./fpt');
const getPhoneFromTGDD = require('./tgdd');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// data in memory to response
var FptPhones = [];
var TgddPhones = [];

// wait get phone from fptShop.com
const waitGetPhoneFromFpt = () => {
  return new Promise((resolve, reject) => {
    getPhoneFromFpt().then(function (fpt) {
      FptPhones = fpt;
      console.log('Get Phone From Fpt Done!');
      resolve();
    });
  })
}

// wait get phone from tgdd.com done
const waitGetPhoneFromTGDD = () => {
  return new Promise((resolve, reject) => {
    getPhoneFromTGDD().then(function (tgdd) {
      TgddPhones = tgdd;
      console.log('Get Phone From The Gioi Di Dong Done!');
      resolve();
    });
  })
}

// wait get all phone done
const getPhone = () => (Promise.all([
  waitGetPhoneFromFpt(),
  waitGetPhoneFromTGDD(),
]).then(() => console.log('Updated new data done!')))

// get phone from website
getPhone();

// refresh data after 12 hours
setInterval(getPhone, 3/4*3600000);

// Answer API requests.
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

app.get('/allFptPhones', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(FptPhones);
});

app.get('/allTgddPhones', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(TgddPhones);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});