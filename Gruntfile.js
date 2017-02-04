module.exports = function(grunt) {
// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Project settings
		yeoman: {
			// Configurable paths
			css: 'html/css',
			scss: 'html/scss',
			js: 'html/js',

			dist: 'dist'
		},

		// Task Configurations
		watch: {
			scss: {
				files: ['<%= yeoman.scss %>/**/*.scss'],
				tasks: ['sass:dev', 'autoprefixer:dev']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'html/*.html',
					'html/partials/*.html',
					'<%= yeoman.css %>/*.css',
					'html/images/**/*.{jpg,jpeg,JPG,png,bmp,gif,svg,webp}'
				]
			}
		},

		sass: {
			dev: {
				options: {
					sourceMap: true,
					includePaths: ['html/libs']
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.scss %>',
					src: ['*.{scss,sass}'],
					dest: '.tmp',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
					browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
				dev: {
					files: [{
						expand: true,
						cwd: '.tmp',
						src: '{,*/}*.css',
						dest: '<%= yeoman.css %>',
						ext: '.css'
					}]
				}
		}
	});

	// Configure Tasks
	grunt.registerTask('default', ['watch']);

};
