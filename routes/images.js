var fs = require('fs');
var baseDir = process.env.BASE_DIR || "/Volumes/Public/Shared Pictures/uploaded/From Trotter's Old 13inch/Masters";

exports.show = function (req, res) {
  var path = req.query.path || '',
      img = fs.readFileSync(baseDir + path);
  res.writeHead(200, {'Content-Type': 'image/jpeg'});
  res.end(img, 'binary');
};