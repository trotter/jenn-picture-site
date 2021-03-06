var utils = require('../utils.js');
var exif = require('libexif');
var fs = require('fs');
// var baseDir = process.env.BASE_DIR || "/Volumes/Public/Shared Pictures/uploaded/From Trotter's Old 13inch/Masters";
var baseDir = utils.baseDir;

exports.image = function (req, res) {
  var path = req.query.path || '',
      img = fs.readFileSync(baseDir + path);
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