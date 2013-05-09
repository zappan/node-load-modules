var path    = require('path')
  , fs      = require('fs')
  ;

// automatic controllers loading
// see: http://blog.pixelingene.com/2012/06/a-simple-organization-scheme-for-expressjs-apps/
function loadControllers(options) {
  options = options || {};

  var app                   = options.app
    , controllerDir         = options.controllerDir
    , skipControllers       = options.skipControllers || []
    , files                 = fs.readdirSync(controllerDir)
    , controllerInitOptions = { app: app }
    , controllers
    ;

  controllers = {};
  files.forEach(function (file) {
    var filePath        = path.resolve('./', controllerDir, file)
      , controllerName  = file.substr(0, file.lastIndexOf('.'))
      , controller      = require(filePath);

    if (skipControllers.indexOf(controllerName) < 0) {
      controllers[controllerName] = controller.init(controllerInitOptions);
    }
  });
  return controllers;
}

module.exports = {
  loadControllers: loadControllers
};
