var utils = require('../utils');
var fs = require('fs');
var _ = require('underscore');
var baseDir = utils.baseDir

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