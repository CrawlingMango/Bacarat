var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver')
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var pathmodify = require('pathmodify');
var uglify = require('gulp-uglify');
var babelify = require('babelify');

var BUILD_DIR = 'build/';

function compile (watch) {
  var bundler = browserify('app/index.jsx', {
    debug: true, // write own sourcemaps
    extensions: [ '.js', '.jsx', '.json' ]
  });

  function bundle() {
    return bundler
    .plugin(pathmodify, {
      mods: [function(rec) {
        if(rec.id[0] === '/' && !rec.id.startsWith(__dirname)) {
          return { id: path.join(__dirname, rec.id.substr(1)) };
        }

        return {};
      }]
    })
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-syntax-export-default-from',
        '@babel/plugin-proposal-export-default-from',
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
      	'@babel/plugin-proposal-class-properties'
      ]
    })    
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // load browserify's sourcemaps
    .pipe(uglify()) // uglify js
    .pipe(sourcemaps.write('.')) // write .map files near scripts
    .pipe(gulp.dest(BUILD_DIR));
  }

  if (watch) {
    bundler = watchify(bundler)
      .on('update', bundle);
  }

  return bundle();
}

gulp.task('js', function() {
  return compile();
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html', '!node_modules/**/*')
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('build', gulp.series('js', 'html'));

gulp.task('webserver', function() {
  return gulp.src(BUILD_DIR)
    .pipe(webserver({
      livereload: true // reload browser page if somethin in BUILD_DIR updates
    }));
});

gulp.task('watch:js', function() {
  return compile(true);
})

gulp.task('watch:html', function() {
  return gulp.watch(['app/**/*.html'], ['html']);
});

gulp.watch('watch', gulp.series('webserver', 'watch:js', 'watch:html'));