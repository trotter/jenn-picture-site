var fs = require('fs');
var baseDir = process.env.BASE_DIR || "/Volumes/Public/Shared Pictures/uploaded/From Trotter's Old 13inch/Masters";

exports.list = function (req, res) {
  console.log(req.query);
  var path = req.query.path || '',
      directories = fs.readdirSync(baseDir + path),
      data = {
        title: path || 'directory',
        path: path,
        directories: directories
      };
  res.render('directories', data);
}