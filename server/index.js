const getPhoneFromFpt = require('./fpt');
const getPhoneFromTGDD = require('./tgdd');
const express = require('express');
const path = require('path');
const AllPhones = require('./allPhones');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// data in memory to response
var fptPhones = [];
var tgddPhones = [];

// wait get phone from fptShop.com
const waitGetPhoneFromFpt = () => {
  return new Promise((resolve, reject) => {
    getPhoneFromFpt().then(function (fpt) {
      fptPhones = fpt;
      console.log('Get Phone From Fpt Done!');
      resolve();
    });
  })
}

// wait get phone from tgdd.com done
const waitGetPhoneFromTGDD = () => {
  return new Promise((resolve, reject) => {
    getPhoneFromTGDD().then(function (tgdd) {
      tgddPhones = tgdd;
      console.log('Get Phone From The Gioi Di Dong Done!');
      resolve();
    });
  })
}

// wait get all phone done
const getPhone = () => (Promise.all([
  waitGetPhoneFromFpt(), // set fptPHones
  waitGetPhoneFromTGDD(), // set tgddPhones
]).then(() => {
  //update to database if exist else create new
  let currentDate = new Date().toDateString();
  AllPhones.findOneAndUpdate({ date: currentDate }, { fptPhones: fptPhones, tgddPhones: tgddPhones, date: currentDate }, { upsert: true, new: true, setDefaultsOnInsert: true}, function(err, doc){
    if(err) throw err;
    // console.log(doc);
  });
  console.log('Updated new data done!')
}))

const setDataFromDatabase = () => {
  let currentDate = new Date().toDateString();
  AllPhones.find({ date: currentDate }, function (err, phoneDay) {
    if (err) throw err;
    if (phoneDay.length > 0) {
      fptPhones = phoneDay[phoneDay.length - 1].fptPhones;
      tgddPhones = phoneDay[phoneDay.length - 1].fptPhones;
    }
  })
}

setDataFromDatabase();
// get phone from website
getPhone();

// refresh data after 12 hours
setInterval(getPhone, 12*3600000);

// Answer API requests.
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

app.get('/allFptPhones', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(fptPhones);
});

app.get('/allTgddPhones', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send(tgddPhones);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});


