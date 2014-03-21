var fs = require('fs');
var _ = require('underscore');
var exif = require('libexif');

exports.Indexer = function (dataStore) {
  this.dataStore = dataStore;
  console.log(this.dataStore);
}

exports.Indexer.prototype = {
  imageRegexp: new RegExp(".jpg", "i"),

  create: function (path) {
    this.walkTree(path, _.bind(this.visitImage, this));
  },

  walkTree: function (basePath, visitor) {
    var files = fs.readdirSync(basePath);
    var self = this;

    _.each(files, function (file) {
      var path = basePath + '/' + file;

      if (self.isDirectory(path)) {
        self.walkTree(path, visitor);
      } else if (self.isImage(path)) {
        visitor(path);
      }
    });
  },

  isDirectory: function (path) {
    return fs.statSync(path).isDirectory();
  },

  isImage: function (path) {
    return this.imageRegexp.test(path) && !this.isDirectory(path);
  },

  visitImage: function (path) {
    var metaData = exif.parse(path);
    this.dataStore.add(metaData.DateTime, path);
  }
}
