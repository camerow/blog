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

handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbs').toString());
handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbs').toString());

// function before() {
//   return function(files, metal, done) {
//     console.log("----- Metalsmith Before -----\n", Object.keys(files).filter((file) => { return /post/.test(file)  }));
//     done();
//   }
// }
//
// function after() {
//   return function(files, metal, done) {
//     console.log("----- Metalsmith After -----\n", Object.keys(files).filter((file) => { return /post/.test(file) }));
//     done();
//   }
// }

Metalsmith(__dirname)
  .clean(true)
  .metadata({
    site: {
      title: "Will Cameron | Blog",
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
  // .use(before())
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  // .use(after())
  .use(collections({
    posts: {
      sortBy: 'date',
      reverse: true
    },
    about: "about.md"
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'templates',
    pattern: '**/*.html',
    // default: 'page.hbs',
    partials: 'templates/partials/'
  }))
  .destination('./build')
  .build(function(err, files) {
    if (err) console.log("ERR", err);
  })
