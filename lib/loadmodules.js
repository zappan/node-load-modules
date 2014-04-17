var path    = require('path')
  , fs      = require('fs')
  ;

// loading modules from a given directory
// see: http://blog.pixelingene.com/2012/06/a-simple-organization-scheme-for-expressjs-apps/
module.exports = function loadModules(options) {
  options = options || {};

  var moduleDir   = options.moduleDir
    , skipModules = options.skipModules || []
    , initializer = options.moduleInitFunction
    , initOptions = options.moduleInitOptions
    , files       = fs.readdirSync(moduleDir)
    , modules
    ;

  modules = {};
  files.forEach(function (file) {
    var filePath    = path.resolve('./', moduleDir, file)
      , moduleName  = file.substr(0, file.lastIndexOf('.'))
      , module      = require(filePath);

    if (skipModules.indexOf(moduleName) < 0) {
      modules[moduleName] = (initializer && module[initializer]) ? module[initializer](initOptions) : module;
    }
  });
  return modules;
};
