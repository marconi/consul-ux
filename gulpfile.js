var express = require('express')
var path = require('path')
var gulp = require('gulp')
var webpack = require('webpack-stream')

gulp.task('build', function() {
	return gulp.src('./app/index.js')
	  .pipe(webpack(require('./webpack.config.js')))
	  .pipe(gulp.dest('./dist/'))
})

gulp.task('default', ['build'], function() {
	var app = express()
	var distPath = path.normalize(__dirname + '/dist')

	app.use(express.static(distPath))
	app.listen(8000)

  gulp.watch('./app/**/*', ['build'])
})
