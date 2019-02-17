/* eslint-disable */
const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const bodyParser = require('body-parser');
const config = require('./config');

const geoCoder = require('node-geocoder');

var app = express();
var server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Bypassing CORS issue
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile('../index.html');
})

//This is a test endpoint. Can delete.
app.get('/api', function(req, res) {
  res.json("Hello");
});

//This endpoint fetches data from the Dark Sky API.
app.get('/api/forecast/', function(req, res) {
  let lat   = req.query.lat;
  let lng  = req.query.lng;
  let unit = (config.units)?'?units='+config.units:'';
  let requestUrl = config.rootUrl + '/' + config.API_KEY + '/' + lat + ',' + lng + unit;
  console.log(requestUrl)
  axios.get(requestUrl)
       .then(function(data) {
         res.status(200).json(data.data);
       })
       .catch(function(error) {
         console.log(error);
       })

});

//This endpoint is used to get the city, country based on the lat, long using node-geocoder package
app.get('/api/location', function(req, res) {
  let lat   = req.query.latitude;
  let long  = req.query.longitude;

  let requestUrl = config.geocodeUrl + 'latlng=' + lat + ',' + long;

  axios.get(requestUrl)
       .then(function(data) {
         let results = data.data.results[0].address_components;
         let city = '';
         let country = '';
         results.forEach(function(item) {
           //check if the types property exists
           if (item['types']) {

             //extract the state and country values
             if (_.isEqual(item['types'], ['locality', 'political'])) {
               city = item['long_name'];
             }

             if (_.isEqual(item['types'], [ 'country', 'political'])) {
               country = item['long_name'];
             }
           }
         });
         res.status(200).json({ city: city, country: country });
       })
       .catch(function(error) {
         console.log(error);
       });
});

server.listen(process.env.PORT || config.port);
console.log('Server running');