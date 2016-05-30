var Metalsmith  = require('metalsmith'),
    /* Metalsmith imports */
    collections = require('metalsmith-collections'),
    markdown    = require('metalsmith-markdown'),
    permalinks  = require('metalsmith-permalinks'),
    layouts     = require('metalsmith-layouts'),
    autoprefixer = require('metalsmith-autoprefixer'),
    sass        = require('metalsmith-sass'),
    /* My plugins */
    findLayout  = require('./libs/plugins/findLayout.js'),
    logMetadata = require('./libs/plugins/logMetadata.js'),
    /* Other imports */
    path        = require('path'),
    fs          = require('fs'),
    moment      = require('moment'),
    handlebars  = require('handlebars');

handlebars.registerHelper('formatDate', function(context, block) {
  // console.log("context", context);
  if (moment || window.moment) {
    var f = "M ddd, YYYY";
    var result = moment(context).format(f);
    console.log("date: ", result);
    return result;
  }

  return context;
});

handlebars.registerPartial('header', fs.readFileSync(__dirname + '/layouts/partials/header.hbs').toString());
handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/layouts/partials/footer.hbs').toString());

Metalsmith(__dirname)
  .clean(true)
  .metadata({
    site: {
      title: "Will Cameron",
      baseUrl: "localhost:3000"
    }
  })
  .use(sass())
  // .use(autoprefixer())
  .use(markdown())
  .use(findLayout({
    pattern: 'posts',
    layout: 'post.hbs'
  }))
  .use(findLayout({
    pattern: 'about',
    layout: 'about.hbs'
  }))
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(collections({
    posts: {
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(layouts({
    engine: 'handlebars',
    pattern: '**/*.html',
    partials: 'layouts/partials/',
    rename: true
  }))
  .destination('./build')
  .build(function(err, files) {
    if (err) console.log("ERR", err);
    for (var file in files) {
      if (/about/.test(file)) {
        console.log(files[file]);
      }
    }
  })
