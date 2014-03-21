exports.DataStore = function () {
  this.data = {};
};

exports.DataStore.prototype = {
  add: function (dateTime, path) {
    var date = dateTime.split(' ')[0].split(':');
    var day = this.createPath(date);
    day.push(path);
  },

  createPath: function (dateArray) {
    var year = this.data[dateArray[0]] = this.data[dateArray[0]] || {};
    var month = year[dateArray[1]] = year[dateArray[1]] || {};
    var day = month[dateArray[2]] = month[dateArray[2]] || [];
    return day;
  }
}
