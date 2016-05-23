module.exports = function findLayout(config) {
  var pattern = new RegExp(config.pattern);

  return function(files, metalsmith, done) {
    for (var file in files) {
      // console.log("FILE: ", file);
      if (pattern.test(file)) {
        var _f = files[file];
        if (!_f.layout) {
          if (!config.layout) {
            done(new Error("You need to provide a layout!"))
          }
          _f.layout = config.layout;
        }
      }
    }
    done();
  };
};
