
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var directory = require('./routes/directory');
var images = require('./routes/images');
var http = require('http');
var path = require('path');
var reload = require('reload');
var utils = require('./utils');
var indexer = require('./indexer');
var ds = require('./inMemoryDataStore');

var app = express();

var index = new indexer.Indexer(new ds.DataStore());
index.create(utils.baseDir);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/directories', directory.list);
app.get('/imageBinary', images.image);
app.get('/images', images.show)

var server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
