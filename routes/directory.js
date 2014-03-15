var fs = require('fs');
var _ = require('underscore');
var baseDir = process.env.BASE_DIR || "/Volumes/Public/Shared Pictures/uploaded/From Trotter's Old 13inch/Masters";

exports.list = function (req, res) {
  var path = req.query.path || '',
      files = fs.readdirSync(baseDir + path),
      data = {
        title: path || 'directory',
        basePath: path
      };

  data.files = _.map(files, function(file) {
    return {
      path: file,
      isDirectory: fs.statSync(baseDir + path + '/' + file).isDirectory()
    }
  });

  res.render('directories', data);
}