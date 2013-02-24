var path    = require('path')
  , fs      = require('fs')
  ;

// automatic routes loading
// see: http://blog.pixelingene.com/2012/06/a-simple-organization-scheme-for-expressjs-apps/
function loadRoutes(options) {
  options = options || {};

  var app       = options.app
    , routeDir  = options.routeDir
    , files     = fs.readdirSync(routeDir)
    , routeInitOptions = { app: app }
    , routes
    ;

  routes = {};
  files.forEach(function (file) {
    var filePath  = path.resolve('./', routeDir, file)
      , routeName = file.substr(0, file.lastIndexOf('.'))
      , route     = require(filePath);
    routes[routeName] = route.init(routeInitOptions);
  });
  return routes;
}

module.exports = {
  loadRoutes: loadRoutes
};
