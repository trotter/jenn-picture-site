var utils = require('../utils.js');
var exif = require('libexif');
var fs = require('fs');
var _ = require('underscore');
// var baseDir = process.env.BASE_DIR || "/Volumes/Public/Shared Pictures/uploaded/From Trotter's Old 13inch/Masters";
var baseDir = utils.baseDir;

exports.Images = function (dataStore) {
  this.dataStore = dataStore;
}

exports.Images.prototype = {
  all: function (req, res) {
    var years = _.keys(this.dataStore.data);
    res.render('imagesAll', {years: years});
  },

  year: function (req, res) {
    var year = req.params.year;
    var months = _.keys(this.dataStore.data[year]);
    res.render('imagesAll', {year: year, months: months});
  },

  month: function (req, res) {
    var year = req.params.year;
    var month = req.params.month;
    var images = _.map(this.dataStore.data[year][month], function (v, k) {
      return {day: k, dataImages: v};
    });

    var data = {
      year: year,
      months: month,
      images: images
    };

    res.render('imagesAll', data);
  }
}

exports.image = function (req, res) {
  var path = req.query.path,
      img = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/jpeg'});
  res.end(img, 'binary');
};

exports.show = function (req, res) {
  var path = req.query.path || '',
      data = {
        exif: exif.parse(baseDir + path),
        basePath: baseDir,
        path: path
      };

  console.log(data.exif.DateTime);
  res.render('imageShow', data);
}