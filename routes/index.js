const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const handlebars = require('express-handlebars');
const path = require('path');

const hbs = handlebars.create({
  defaultLayout: 'layout', // --> базовый шаблон
  extname: 'hbs', // --> какое расширение
  layoutsDir: path.join(__dirname, 'views'), // путь, где будут лежать шаблоны
  partialsDir: path.join(__dirname, 'views'), // путь, где будут лежать кусочные шаблоны
});

const createTemplate = async function (req, res, next) {
  const template = await hbs.getTemplate("views/airQuality.hbs", {
    precompiled: true
  });
  const template2 = await hbs.getTemplate("views/pollen.hbs", {
    precompiled: true
  });
  res.airTemplate = template;
  res.pollenTemplate = template2;
  next();
};

let coord;
router.get('/', createTemplate, (req, res) => {
  res.render('index', {
    template: res.airTemplate,
    template2: res.pollenTemplate
  });
});


router.post('/airQuality', async (req, res) => {
  let resp = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBjdz6h0RPUN2u_w5chgW9F-5-CFH0c7K8&input=${req.body.city}&inputtype=textquery&fields=geometry`);
  let json = await resp.json();
  coord = json.candidates[0].geometry.location;

  let resp2 = await fetch(`https://api.breezometer.com/air-quality/v2/current-conditions?lat=${coord.lat}&lon=${coord.lng}&key=2056c63eb0c840dcb2bc3bc504d95f74`);
  let json2 = await resp2.json();

  res.json({data: json2.data.indexes.baqi});
  console.log(coord);
  console.log(json2);

});

router.post('/pollen', async (req, res) => {
  let resp = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBVXms82QurK5zEVShTHoP77qPoAIwLwIw&input=${req.body.city}&inputtype=textquery&fields=geometry`);
  let json = await resp.json();
  coord = json.candidates[0].geometry.location;

  let resp2 = await fetch(`https://api.breezometer.com/pollen/v2/forecast/daily?lat=${coord.lat}&lon=${coord.lng}&key=2056c63eb0c840dcb2bc3bc504d95f74&features=&days=3`);
  let json2 = await resp2.json();

  res.json({data: json2.data});
  console.log(coord);
  console.log(json2);

});




module.exports = router;


