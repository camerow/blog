module.exports = function logMetadata(options) {
  return function(files, metalsmith, done) {
    for (var file in files) {
      Object.keys(metalsmith.metadata()).forEach(function(key) {
        console.log(metalsmith.metadata()[key]);
      });
      done();
    }
  }
}
